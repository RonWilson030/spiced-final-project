const express = require("express");
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

app.use(
    cookieSession({
        secret: `Cookie monster!`,
        maxAge: 1000 * 60 * 60 * 24 * 1,
    })
);

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

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("/user", (req, res) => {
    const userId = req.session.userId;
    db.getUserById(userId)
        .then((response) => {
            // console.log("get user response: ", response);
            const {
                first,
                last,
                email,
                profile_pic: profilePic,
                bio,
            } = response.rows[0];
            res.json({ first, last, email, profilePic, bio });
        })
        .catch((error) => {
            console.log("registration error", error);
        });
});

app.get("/other-user/:id", (req, res) => {
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
                    res.json({ id, first, last, email, profilePic, bio });
                }
            })
            .catch((error) => {
                console.log("registration error", error);
            });
    }
});

app.post("/registration", (req, res) => {
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
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    // console.log("req body: ", req.body);
    db.getUserByEmail(email).then((userResult) => {
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
        }
    });
});

app.post("/password/reset", (req, res) => {
    const { email } = req.body;
    // console.log("reset req body: ", req.body);
    db.getUserByEmail(email).then((emailResult) => {
        // console.log("email result:", emailResult);
        if (emailResult.rows.length === 1) {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            db.addCode(email, secretCode)
                .then((addCodeResult) => {
                    console.log("add code result:", addCodeResult);
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
    // const userId = req.session.userId;
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

app.post("/uploader", uploader.single("image"), s3.upload, (req, res) => {
    // console.log("req body: ", req.body);
    // console.log("file: ", req.file);
    const userId = req.session.userId;
    const url = s3Url + req.file.filename;
    db.updateProfilePic(userId, url)
        .then((result) => {
            // console.log("result image: ", result);
            if (req.file) {
                res.json({ success: true, profilePic: url });
            } else {
                res.json({ success: false });
            }
        })
        .catch();
});

app.post("/bio", (req, res) => {
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

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
