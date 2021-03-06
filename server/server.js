const express = require("express");
const axios = require("axios");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bcrypt");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const s3 = require("./s3");
const { s3Url } = require("./config");
const multer = require("multer");
const uidSafe = require("uid-safe");
const server = require("http").Server(app);
const { API_KEY } = require("./secrets.json");
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
/////////////////////////////////////////////////////////////////////////////////
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + "/uploads");
    },
    filename: (req, file, callback) => {
        uidSafe(24)
            .then((uid) => {
                callback(null, `${uid}${path.extname(file.originalname)}`);
            })
            .catch((error) => callback(error));
    },
});

const uploader = multer({
    storage,
    limits: {
        fileSize: 2097152, //2MB
    },
});

const cookieSessionMiddleware = cookieSession({
    secret: `Cookie monster!`,
    maxAge: 1000 * 60 * 60 * 24 * 1,
});

app.use(cookieSessionMiddleware);

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// app.use((req, res, next) => {
//     console.log("-----------");
//     console.log(`${req.method} request coming in on route ${req.url}`);
//     console.log("-----------");
//     next();
// });

////////////////////////////////////////////////////////////////////////////

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("/api/recipes/search", async (req, res) => {
    const { q, category, offset } = req.query;
    const userId = req.session.userId;
    const params = {
        number: 12,
        apiKey: API_KEY,
        offset,
    };
    let url;
    if (category === "ingredients") {
        url = "https://api.spoonacular.com/recipes/findByIngredients";
        params.ingredients = q;
    } else {
        url = "https://api.spoonacular.com/recipes/complexSearch";
        params.query = q;
    }
    const response = await axios.get(url, { params });
    const results =
        category === "ingredients" ? response.data : response.data.results;

    try {
        const recipes = await Promise.all(
            results.map(async (item) => {
                let recipeResult = await db.getRecipeByRemoteId(
                    userId,
                    item.id
                );
                if (recipeResult.rows.length === 1) {
                    return recipeResult.rows[0];
                } else {
                    const url = `https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${API_KEY}`;
                    const infoResponse = await axios.get(url);
                    const { sourceUrl } = infoResponse.data;
                    const { id, title, image } = item;
                    recipeResult = await db.addRecipe(
                        title,
                        image,
                        sourceUrl,
                        id
                    );
                    return {
                        ...recipeResult.rows[0],
                        favourite_id: null,
                    };
                }
            })
        );
        res.json({
            recipes: recipes.map(
                ({ id, imageurl, title, url, favourite_id }) => ({
                    id,
                    title,
                    imageUrl: imageurl,
                    url,
                    favouriteId: favourite_id,
                })
            ),
        });
    } catch (error) {
        console.log("Search Error!", error);
        res.statusCode = 500;
        res.json({ error: "Unexpected error!" });
    }
});

app.post("/api/recipes/favourite", async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.session.userId;
    try {
        const result = await db.addFavourite(userId, recipeId);
        // console.log("add fave result: ", result);
        res.json({ favouriteId: result.rows[0].id });
    } catch (error) {
        console.log("add favourite error", error);
    }
});

app.delete("/api/recipes/favourite/:id", async (req, res) => {
    // console.log("query req params : ", req.params);
    // console.log("req body: ", req.body);
    const { id } = req.params;
    const userId = req.session.userId;
    try {
        const deleteResult = await db.deleteFavourite(userId, id);
        console.log("delete fave result: ", deleteResult);
        res.statusCode = 204;
        res.send();
    } catch (error) {
        console.log("delete favourite error", error);
    }
});

app.get("/api/users", (req, res) => {
    const userId = req.session.userId;
    db.getUserById(userId)
        .then((response) => {
            // console.log("get user response: ", response);
            const {
                id,
                first,
                last,
                email,
                profile_pic: profilePic,
                bio,
            } = response.rows[0];
            res.json({ id, first, last, email, profilePic, bio });
        })
        .catch((error) => {
            console.log("users error", error);
        });
});

app.get("/api/users/search", (req, res) => {
    const { q } = req.query;
    // console.log("req params q: ", req.query);
    db.searchForUsers(q)
        .then((response) => {
            // console.log("get user response: ", response);
            res.json(
                response.rows.map(({ id, first, last, profile_pic }) => ({
                    id,
                    first,
                    last,
                    profile_pic,
                }))
            );
        })
        .catch((error) => {
            console.log("search error", error);
        });
});

app.get("/api/users/:id", (req, res) => {
    // console.log("req params", req.params);
    // console.log("user id:", req.session.userId);
    const id = parseInt(req.params.id);
    // console.log("parsed id: ", id);
    if (id === req.session.userId) {
        res.json({ noSuchUser: true });
    } else {
        db.getOtherUserById(id)
            .then((response) => {
                // console.log("get other user response: ", response);
                if (response.rows.length === 0) {
                    res.json({ noSuchUser: true });
                } else {
                    const {
                        id,
                        first,
                        last,
                        email,
                        profile_pic: profilePic,
                        bio,
                    } = response.rows[0];
                    db.getUserFavouriteRecipes(id)
                        .then((result) => {
                            // console.log("get other user faves: ", result);
                            res.json({
                                id,
                                first,
                                last,
                                email,
                                profilePic,
                                bio,
                                favourites: result.rows,
                            });
                        })
                        .catch((error) => {
                            console.log("users error", error);
                        });
                    // res.json({ id, first, last, email, profilePic, bio });
                }
            })
            .catch((error) => {
                console.log("users error", error);
            });
    }
});

app.post("/api/registration", (req, res) => {
    // console.log("req body: ", req.body);
    const { first, last, email, password } = req.body;
    if (first && last && email && password) {
        hash(req.body.password).then((hash) => {
            const hashedPw = hash;
            db.registerUser(first, last, email, hashedPw)
                .then((result) => {
                    // console.log("register result: ", result);
                    const userId = result.rows[0].id;
                    req.session.userId = userId;
                    res.json(result.rows);
                })
                .catch((error) => {
                    console.log("registration error", error);
                });
        });
    } else {
        console.log("registration error");
        res.statusCode = 401;
        res.send();
    }
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    // console.log("req body: ", req.body);
    db.getUserByEmail(email)
        .then((userResult) => {
            // console.log("password result:", userResult);
            if (userResult.rows.length === 1) {
                const hash = userResult.rows[0].password;
                compare(password, hash)
                    .then((matched) => {
                        if (matched) {
                            // console.log("matched result:", matched);
                            const userId = userResult.rows[0].id;
                            req.session.userId = userId;
                            res.json({ success: true });
                        }
                    })
                    .catch((error) => {
                        console.log("login error:", error);
                    });
            } else {
                console.log("login error");
                res.statusCode = 401;
                res.send();
            }
        })
        .catch((error) => {
            console.log("login error:", error);
        });
});

app.post("/api/password/reset", (req, res) => {
    const { email } = req.body;
    // console.log("reset req body: ", req.body);
    db.getUserByEmail(email).then((emailResult) => {
        // console.log("email result:", emailResult);
        if (emailResult.rows.length === 1) {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            db.addCode(email, secretCode)
                .then(() => {
                    // console.log("add code result:", addCodeResult);
                    sendEmail(
                        email,
                        secretCode,
                        "heres your code to reset your password"
                    )
                        .then(() => res.json({ success: true }))
                        .catch((error) => {
                            console.log("login error:", error);
                        });
                })
                .catch((error) => {
                    console.log("login error:", error);
                });
        }
    });
});

app.post("/password/reset/code", (req, res) => {
    // console.log("req body: ", req.body);
    const { email, code, newpassword } = req.body;
    db.getCode(code).then((getCodeResult) => {
        // console.log("get code result: ", getCodeResult);
        if (getCodeResult.rows.length === 1 && newpassword) {
            hash(newpassword)
                .then((hash) => {
                    const hashedPw = hash;
                    db.updatePassword(email, hashedPw)
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((error) => {
                            console.log("reset code and pw error:", error);
                        });
                })
                .catch((error) => {
                    console.log("hash error:", error);
                });
        }
    });
});

app.post("/api/uploader", uploader.single("image"), s3.upload, (req, res) => {
    const userId = req.session.userId;
    const url = s3Url + req.file.filename;
    db.updateProfilePic(userId, url)
        .then(() => {
            // console.log("result image: ", result);
            if (req.file) {
                res.json({ success: true, profilePic: url });
            } else {
                res.json({ success: false });
            }
        })
        .catch();
});

app.post("/api/bio", (req, res) => {
    // console.log("req body: ", req.body);
    const userId = req.session.userId;
    const { draftBio } = req.body;
    db.updateBio(userId, draftBio)
        .then((response) => {
            // console.log("get bio response: ", response);
            const { bio } = response.rows[0];
            res.json({ success: true, bio });
        })
        .catch((error) => {
            console.log("registration error", error);
        });
});

app.get("/api/friendship/status/:otherUserId", (req, res) => {
    // console.log("req params: ", req.params);
    const otherUserId = parseInt(req.params.otherUserId);
    const userId = req.session.userId;
    db.getFriendshipStatus({ userId, otherUserId })
        .then((response) => {
            // console.log("friendship status response: ", response);
            res.json({ rows: response.rows });
        })
        .catch((error) => {
            console.log("friendship status error", error);
        });
});

app.post("/api/friendship/action", (req, res) => {
    const userId = req.session.userId;
    const { action, otherUserId } = req.body;
    if (action === "Make Request") {
        db.makeRequest({ userId, otherUserId })
            .then((response) => {
                // console.log("make request response: ", response);
                res.json({ success: true, rows: response.rows });
            })
            .catch((error) => {
                console.log("make request error", error);
            });
    } else if (action === "Cancel Request" || action === "disconnect") {
        // console.log("user id & otheruserId:", userId, otherUserId);
        db.cancelRequest({ userId, otherUserId })
            .then((response) => {
                // console.log("cancel/disconnect request response: ", response);
                res.json({ success: true, rows: response.rows });
            })
            .catch((error) => {
                console.log("cancel/disconnect request error", error);
            });
    } else if (action === "Accept Request") {
        db.acceptRequest({ userId, otherUserId })
            .then((response) => {
                // console.log("accept request response: ", response);
                res.json({ success: true, rows: response.rows });
            })
            .catch((error) => {
                console.log("accept request error", error);
            });
    }
});

app.get("/api/friends", (req, res) => {
    const userId = req.session.userId;
    db.getFriends(userId)
        .then((result) => {
            // console.log("get friends result", result);
            res.json({ success: true, friendsList: result.rows });
        })
        .catch((error) => {
            console.log("get friend error", error);
        });
});

app.get("/api/favourites", (req, res) => {
    const userId = req.session.userId;
    db.getUserFavouriteRecipes(userId)
        .then((result) => {
            // console.log("get fave action result", result);
            res.json({ success: true, favourites: result.rows });
        })
        .catch((error) => {
            console.log("get faves error", error);
        });
});

app.delete("/api/favourites/:id", (req, res) => {
    const userId = req.session.userId;
    db.deleteFavourite(userId, req.params.id)
        .then((response) => {
            // console.log("delete fave request response: ", response);
            res.json({ success: true, rows: response.rows });
        })
        .catch((error) => {
            console.log("delete favourites error", error);
        });
});

app.post("/api/shoppinglist/add", async (req, res) => {
    const userId = req.session.userId;
    const { item } = req.body;
    try {
        const addItemResult = await db.addListItem(userId, item);
        // console.log("add listitem result: ", addItemResult);
        res.json(addItemResult.rows[0]);
    } catch (error) {
        console.log("get listitem error", error);
    }
});

app.get("/api/shoppinglist", async (req, res) => {
    const userId = req.session.userId;
    try {
        const getListResult = await db.getShoppingList(userId);
        // console.log("get shopping list result: ", getListResult);
        res.json({ shoppingList: getListResult.rows });
    } catch (error) {
        console.log("get listitem error", error);
    }
});

app.delete("/api/shoppinglist/:id", (req, res) => {
    const userId = req.session.userId;
    db.deleteListItem(userId, req.params.id)
        .then((response) => {
            // console.log("delete fave request response: ", response);
            res.json({ success: true, rows: response.rows });
        })
        .catch((error) => {
            console.log("delete favourites error", error);
        });
});

app.get("/api/search/trivia", async (req, res) => {
    const url = `https://api.spoonacular.com/food/trivia/random?apiKey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        console.log("trivia response: ", response);
        res.json({ result: response.data });
    } catch (error) {
        console.log("Search Error!", error);
        res.statusCode = 500;
        res.json({ error: "Unexpected error!" });
    }
});

app.get("/api/search/joke", async (req, res) => {
    const url = `https://api.spoonacular.com/food/jokes/random?apiKey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        console.log("joke response: ", response);
        res.json({ result: response.data });
    } catch (error) {
        console.log("Search Error!", error);
        res.statusCode = 500;
        res.json({ error: "Unexpected error!" });
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome#/login");
    res.send();
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

let onlineUsers = {};
const onlineUserCounters = {};

io.on("connection", async (socket) => {
    // console.log(`socket with id ${socket.id} just connected`);
    // console.log("socket.request.session: ", socket.request.session);

    const userId = socket.request.session.userId;

    if (!userId) {
        return socket.disconnect(true);
    }

    onlineUsers[socket.id] = userId;
    onlineUserCounters[userId] = (onlineUserCounters[userId] || 0) + 1;

    // console.log("online users: ", onlineUsers);

    const usersOnline = Object.keys(onlineUserCounters).filter(
        (id) => id !== userId
    );

    if (onlineUserCounters[userId] === 1) {
        const userResult = await db.getUsersByIds([userId]);
        socket.broadcast.emit("user joined", userResult.rows[0]);
    }

    if (usersOnline) {
        const usersResult = await db.getUsersByIds(usersOnline);
        socket.emit("online users", usersResult.rows);
    }

    socket.on("disconnect", () => {
        const userId = onlineUsers[socket.id];
        delete onlineUsers[socket.id];

        onlineUserCounters[userId] = onlineUserCounters[userId] - 1;
        if (onlineUserCounters[userId] === 0) {
            // console.log("user left", userId);
            delete onlineUserCounters[userId];
            io.emit("user left", userId);
        }
    });

    socket.on("new chat message", (message) => {
        db.addChatMessage(userId, message)
            .then((result) => {
                // console.log("get add message result", result);
                const { id, timestamp } = result.rows[0];
                db.getUserById(userId)
                    .then((result) => {
                        // console.log("get userId result", result);
                        const { first, last, profile_pic } = result.rows[0];
                        io.sockets.emit("new message and user", {
                            id,
                            message,
                            first,
                            last,
                            profile_pic,
                            timestamp,
                        });
                    })
                    .catch((error) => {
                        console.log("get user error", error);
                    });
            })
            .catch((error) => {
                console.log("add chat error", error);
            });
    });

    db.getMessages()
        .then(({ rows: messages }) => {
            socket.emit("get messages", messages, userId);
        })
        .catch((error) => {
            console.log("get chat error", error);
        });
});
