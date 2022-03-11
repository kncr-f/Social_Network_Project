const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("../database/db");
const { compare, hash } = require("../bc");
const cryptoRandomString = require('crypto-random-string');
const { sendEmail } = require("./ses.js");

//upload process
const s3 = require("../s3");

const multer = require("multer");
const uidSafe = require("uid-safe");


const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "/uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));


//cookieSession
const cookieSession = require('cookie-session');

app.use(cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true
}));


//express.json middleware
app.use(express.json());

app.get("/user/id.json", (req, res) => {
    // console.log('react app is checking if the user is logged in or not');
    res.json({
        userId: req.session.userId
        //userId: undefined
    });

});


app.post("/user/register.json", (req, res) => {
    const { first, last, email, password } = req.body;
    hash(password).then((hashedPassword) => {
        db.addUser(first, last, email, hashedPassword)
            .then(({ rows }) => {
                // console.log('rows.....', rows);
                req.session.userId = rows[0].id;
                //console.log('req.session', req.session);
                res.json({ success: true });
            }).catch((err) => {
                console.log("error getting data from database", err);
                res.json({ success: false });
            });
    });

});


app.post("/user/login.json", (req, res) => {
    const { email, password } = req.body;

    // if (email === "" || password === "") {
    //     
    // } 

    db.getUser(email).then(({ rows }) => {
        console.log(rows);
        if (rows.length > 0) {
            compare(password, rows[0].password).then((match) => {
                if (match) {
                    req.session.userId = rows[0].id;
                    res.json({ success: true });

                } else {
                    res.json({ success: false });
                }
            })
                .catch((err) => {
                    console.log("error getting data from database", err);
                    res.json({ success: false });
                });

        } else {
            console.log("error getting data from database");
            res.json({ success: false });
        }


    });

});

app.post("/reset", (req, res) => {
    const { email } = req.body;
    db.getUser(email)
        .then(({ rows }) => {
            console.log('rows in post /reset', rows);
            if (rows.length > 0) {

                //it means there is a macht and it is a registered email
                const secretCode = cryptoRandomString({
                    length: 6
                });
                db.addSecretCode(email, secretCode)
                    .then(({ rows }) => {
                        console.log('addSecretCode rows...', rows);
                        const emailMessage = `Your secret code is ${secretCode}`;
                        sendEmail("inky.muenster@spicedling.email", emailMessage, "Update Your Password");
                        res.json({ success: true });
                    })
                    .catch(() => {
                        res.json({ success: false });
                    });

            } else {
                res.json({ success: false });
            }
        })
        .catch(() => {
            res.json({ success: false });
        });


});

app.post("/verify", (req, res) => {
    const { code, new_password, email } = req.body;
    db.getSecretCode(email).then(({ rows }) => {

        const reqBodyCode = code;
        const sendedCode = rows[0].code;
        console.log(reqBodyCode, sendedCode);

        if (reqBodyCode == sendedCode) {
            hash(new_password)
                .then((hashedPassword) => {
                    console.log(hashedPassword);
                    db.updatePassword(hashedPassword, email)
                        .then(() => {
                            console.log("hereeee....");
                            res.json({ success: true });
                        })
                        .catch((err) => {
                            console.log("password updating failed", err);
                            res.json({ success: false });
                        });
                })
                .catch((err) => {
                    console.log("password reseting failed", err);
                    res.json({ success: false });
                });

        } else {
            res.json({ succes: false });
        }
    });

});


app.get("/user", (req, res) => {
    db.getLoggedUser(req.session.userId)
        .then(({ rows }) => {
            console.log('rows in /user route...', rows[0]);
            res.json(rows[0]);
        }).catch((err) => console.log("getting looged user failed", err));
});


app.post("/profile_pic", uploader.single("file"), s3.upload, (req, res) => {
    console.log('hreree');
    let id = req.session.userId;
    let url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
    db.updateImage(url, id).then(({ rows }) => {
        console.log('rows /profile_pic in server....', rows);
        res.json({ profile_pic: rows[0].profile_pic });
    }).catch((err) => {
        console.log('error updating image', err);
    });


});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");

});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
