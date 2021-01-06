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

app.use(express.json());

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
        // } else {
        //     res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("req body: ", req.body);
    db.getUserByEmail(email).then((userResult) => {
        console.log("password result:", userResult);
        if (userResult.rows.length === 1) {
            const hash = userResult.rows[0].password;
            compare(password, hash)
                .then((matched) => {
                    if (matched) {
                        console.log("matched result:", matched);
                        const userId = userResult.rows[0].id;
                        req.session.userId = userId;
                        res.json({ success: true });
                        // } else {
                        // res.render("login", {
                        //     layout: "main",
                        //     title: "Petition",
                        //     error: true,
                        // });
                    }
                })
                .catch((error) => {
                    console.log("login error:", error);
                });
        } else {
            // res.render("login", {
            //     layout: "main",
            //     title: "Petition",
            //     error: true,
            // });
        }
    });
});

app.post("/resetpassword/reset", (req, res) => {
    const { email } = req.body;
    console.log("reset req body: ", req.body);
    db.getUserByEmail(email).then((emailResult) => {
        console.log("email result:", emailResult);
        if (emailResult.rows.length === 1) {
            compare(email).then((matched) => {
                console.log("matched result:", matched);
                if (matched) {
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
                // } else {
                //     // res.render("login", {
                //     //     layout: "main",
                //     //     title: "Petition",
                //     //     error: true,
                //     // });
                // }
                //             })
                //         .catch((error) => {
                //             console.log("login error:", error);
                //         });
                // } else {

                // };
            });
        }
    });
});

// app.post("/resetpassword/code", (req, res) => {
//     // // runs when user enters code and new password
// });

// app.post("/resetpassword/success", (req, res) => {
//     // verify code (match), make sure it is not expired
//     // reset hashed password and update users table
// });

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
