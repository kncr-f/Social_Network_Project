const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("../database/db");
const { compare, hash } = require("../bc");
const cryptoRandomString = require('crypto-random-string');
const { sendEmail } = require("./ses.js");


const server = require('http').Server(app);
const io = require('socket.io')(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000"))
});


//upload process
const s3 = require("../s3");
console.log(s3);

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

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true
});

// creating a cookieSessionMiddleware in order to use socket.io
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});


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

    db.getUserByEmail(email).then(({ rows }) => {
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
    db.getUserByEmail(email)
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
                    //console.log(hashedPassword);
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


app.get("/user.json", (req, res) => {
    console.log('req.session.userId :>> ', req.session.userId);
    db.getUserById(req.session.userId)
        .then(({ rows }) => {
            console.log('rows in /user.json route...', rows[0]);
            res.json(rows[0]);
        }).catch((err) => console.log("getting looged user failed", err));
});


app.post("/profile_pic", uploader.single("file"), s3.upload, (req, res) => {

    let id = req.session.userId;
    let url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
    db.updateImage(url, id).then(({ rows }) => {
        //console.log('rows /profile_pic in server....', rows);
        res.json({ profile_pic: rows[0].profile_pic });
    }).catch((err) => {
        console.log('error updating image', err);
    });


});

app.post("/user/profile/bio", (req, res) => {
    // console.log('req.body', req.body);
    const { draftBio } = req.body;

    db.getBioText(draftBio, req.session.userId)
        .then(({ rows }) => {
            // console.log("get bio text in server", rows);
            res.json(rows[0].bio_text);
        })
        .catch((err) => {
            console.log('error getting bio_text', err);
        });

});

app.get("/users.json", (req, res) => {

    const searchTerm = req.query.search;
    //console.log("searchTerm...", searchTerm);
    if (searchTerm) {
        db.getMatchingUsers(searchTerm)
            .then(({ rows }) => {
                // console.log("matching users..", rows);
                // req.session.userId filter logic
                res.json(rows);
            }).catch((err) => {
                console.log("err with getting matchingUsers", err);
            });

    } else {
        db.getRecentUsers()
            .then(({ rows }) => {
                console.log("users row.....", rows);
                const exceptUser = rows.filter((item) => item.id !== req.session.userId);
                res.json(exceptUser);
            }).catch((err) => {
                console.log("err with getting users", err);
            });
    }



});


app.get("/user_info/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    db.getUserById(id)
        .then(({ rows }) => {
            console.log('rows in /user_info/:id.json route...', rows[0]);

            if (typeof rows[0] === "undefined") {
                res.json({ success: false });

            } else {
                res.json(rows[0]);
            }


        }).catch((err) => console.log("getting otherUser failed", err));
});


app.get("/friendship/:otherUserId", (req, res) => {
    const { otherUserId } = req.params;
    const loggedInUserId = req.session.userId;

    db.getFriendRequests(loggedInUserId, otherUserId)
        .then(({ rows }) => {
            // console.log('rows in/friendship/:id route...', rows[0]);
            res.json(rows);

        }).catch((err) => {
            console.log('error getting Friend Request', err);
        });

});


app.post("/friendship-status", (req, res) => {
    const { friendshipStatu, otherUserId } = req.body;

    if (friendshipStatu == "make_request") {
        db.makeFriendRequest(req.session.userId, otherUserId)
            .then(({ rows }) => {
                console.log('rows in /friendship-status makefriendRequest', rows);
                res.json({ friendshipStatu: "cancel_Request" });
            }).catch((err) => {
                console.log("error making friendRequest", err);

            });
    } else if (friendshipStatu == "cancel_Request") {
        db.deleteFriendships(req.session.userId, otherUserId)
            .then(({ rows }) => {
                console.log("rows in /friendship-status cancel_request", rows);
                res.json({ friendshipStatu: "make_request" });
            })
            .catch((err) => {
                console.log("error canceling friendRequest", err);

            });
    } else if (friendshipStatu == "accept_Request") {
        db.acceptFriendRequest(otherUserId, req.session.userId)
            .then(({ rows }) => {
                console.log("rows in /friendship-status accept_Request", rows);
                res.json({ friendshipStatu: "unfriend" });

            }).catch((err) => {
                console.log("error accept_Request", err);
            });
    } else if (friendshipStatu == "unfriend") {
        db.deleteFriendships(req.session.userId, otherUserId)
            .then(() => {
                console.log("rows in /friendship-status unfriend");
                res.json({ friendshipStatu: "make_request" });
            }).catch((err) => {
                console.log("error unfriend Request", err);

            });
    }


});


app.get("/friends-page.json", (req, res) => {
    const loggedInUserId = req.session.userId;
    db.friendsPageInfos(loggedInUserId).then(({ rows }) => {
        console.log("friends-page rows", rows);
        res.json(rows);
    });


});

app.post("/friendship-accepted", (req, res) => {
    const { otherUserId } = req.body;

    console.log('otherUserId', otherUserId);
    db.acceptFriendRequest(otherUserId, req.session.userId)
        .then(({ rows }) => {
            console.log("rows in /friendship-accepted", rows);
            res.json({ success: true });

        }).catch((err) => {
            console.log("error accept_Request", err);
        });
});

app.post("/friendship-deleted", (req, res) => {
    const { otherUserId } = req.body;
    db.deleteFriendships(otherUserId, req.session.userId).then(() => {
        res.json({ userDeleted: true });
    }).catch((err) => {
        console.log("error friendship-deleted", err);

    });

});

app.post("/delete-account", (req, res) => {

    db.getImage(req.session.userId)
        .then(({ rows }) => {
            console.log('rows from server............', rows[0]);

            db.deleteChatMessages(req.session.userId)
                .then(() => {

                    db.deleteFriendships(req.session.userId)
                        .then(() => {
                            db.deleteUsers(req.session.userId)
                                .then(() => {

                                    //Version 1 correspond s3.delete function here with then() because it is promisified 

                                    // s3.delete(keyOfUrl).then(() => {
                                    //     console.log("s3 delete worksss...");
                                    //     req.session = null;
                                    //     res.redirect("/");

                                    // }).catch((err) => {
                                    //     console.log('err catch inside delete', err);
                                    // });


                                    // Version 2
                                    if (rows[0].profile_pic) {
                                        const url = rows[0].profile_pic;
                                        const keyOfUrl = url.replace("https://s3.amazonaws.com/spicedling/", "");

                                        s3.delete(keyOfUrl);
                                        console.log("s3 images deleted");
                                        req.session = null;
                                        res.json({ success: true });


                                    } else {
                                        req.session = null;
                                        res.json({ success: true });

                                    }

                                });
                        });
                })
                .catch((err) => {
                    console.log('deleteaccount failed..', err);
                    res.json({ succes: false });
                });

        });



});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");

});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});


//group chat with socket.io
io.on('connection', async function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;

    const { rows } = await db.getLatestMessages();
    socket.emit(
        'chatMessages', rows
    );

    socket.on('chatMessageFromClient', function (msg) {
        //console.log('msg', msg);
        db.saveMessage(userId, msg.text).then(function () {
            return db.getUserById(userId);
        }).then(({ rows }) => {
            io.emit(
                'chatMessageFromServer',
                /* construct chat message object */
                {
                    first: rows[0].first,
                    last: rows[0].last,
                    profile_pic: rows[0].profile_pic,
                    message_text: msg.text

                },

                console.log("chatMessageFromServer rows", rows)

            );
        });
    });


});

