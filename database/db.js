const spicedPg = require("spiced-pg");
const db = spicedPg(process.env.DATABASE_URL ||
    `postgres:postgres:pstgres@localhost:5432/social`);

module.exports.addUser = (first, last, email, password) => {
    return db.query(`
    INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING first, last, email, password, Id
    
    `, [first, last, email, password]);
};

module.exports.getUserByEmail = (email) => {
    return db.query(`
    SELECT password, id 
    FROM users
    WHERE email = $1
    `, [email]);
};


module.exports.addSecretCode = (email, code) => {

    return db.query(`
    INSERT INTO reset_codes (email, code)
    VALUES ($1, $2)
    RETURNING  email, code
    
    `, [email, code]);
};

module.exports.getSecretCode = (email) => {
    return db.query(`
    SELECT * FROM reset_codes
    WHERE email =$1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    ORDER BY created_at DESC
    LIMIT 1
    `, [email]);
};
module.exports.updatePassword = (password, email) => {
    return db.query(`
    UPDATE users
    SET password =$1
    WHERE email=$2
    `, [password, email]);
};

module.exports.getUserById = (id) => {
    return db.query(`
    SELECT id, first, last, profile_pic, bio_text
    FROM users
    WHERE id = $1 
    `, [id]);
};

module.exports.updateImage = (url, id) => {
    return db.query(`
    UPDATE users
    SET profile_pic =$1
    WHERE id =$2
    RETURNING profile_pic`, [url, id]);

};

module.exports.getBioText = (bio_text, id) => {
    return db.query(`
    UPDATE users
    SET bio_text =$1
    WHERE id=$2
    RETURNING *
    `, [bio_text, id]);
};

module.exports.getRecentUsers = () => {
    return db.query(`SELECT * 
                    FROM users 
                    ORDER BY created_at DESC
                    LIMIT 6`);
};

module.exports.getMatchingUsers = (val) => {
    return db.query(`
    SELECT * FROM users
    WHERE first ILIKE $1;
    `, [val + "%"]
    );
};

module.exports.getFriendRequests = (sender_id, recipient_id) => {
    return db.query(`
    SELECT * FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)
    `, [sender_id, recipient_id]
    );
};


module.exports.makeFriendRequest = (sender_id, recipient_id) => {
    return db.query(`
    INSERT INTO friendships (sender_id, recipient_id, accepted)
    VALUES ($1, $2, false)
    RETURNING *
    
    `, [sender_id, recipient_id]);
};

module.exports.acceptFriendRequest = (sender_id, recipient_id) => {
    return db.query(`
    UPDATE friendships
    SET accepted = true 
    WHERE sender_id =$1 AND recipient_id=$2
  `, [sender_id, recipient_id]);
};


module.exports.deleteFriendships = (sender_id, recipient_id) => {
    return db.query(`
    DELETE FROM friendships 
    WHERE (sender_id =$1 AND recipient_id=$2)
    OR (recipient_id = $1 AND sender_id = $2)
    `, [sender_id, recipient_id]);
};


module.exports.friendsPageInfos = (id) => {
    return db.query(`
    SELECT users.id, first, last, profile_pic, bio_text, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
    `, [id]);

};

module.exports.saveMessage = (userId, message_text) => {
    return db.query(`
    INSERT INTO chat_messages (user_id, message_text)
    VALUES ($1,$2)
    RETURNING *`, [userId, message_text]);
};

module.exports.getLatestMessages = () => {
    return db.query(`
    SELECT 
    chat_messages.id, 
    message_text, 
    chat_messages.created_at, 
    user_id, first, last, profile_pic 
    FROM chat_messages LEFT OUTER JOIN users ON user_id = users.id
    ORDER BY chat_messages.created_at DESC
    LIMIT 10
    `);
};


module.exports.deleteUsers = (id) => {
    return db.query(`
    DELETE FROM users
    WHERE id=$1
    `, [id]);
};

module.exports.deleteChatMessages = (user_id) => {
    return db.query(`
    DELETE FROM chat_messages
    WHERE id = $1
    `, [user_id]);
};

module.exports.deleteUsersFriends = (id) => {
    return db.query(`
    DELETE FROM friendships
    WHERE sender_id =$1 OR recipient_id = $1
    `, [id]);
};

module.exports.getImage = (id) => {
    return db.query(` 
    SELECT profile_pic FROM users
    WHERE id=$1

    `, [id]);
};

module.exports.getMutualFrieds = (loggedInUserId, otherUserId) => {
    return db.query(`
    SELECT users.id, users.first, users.last, users.profile_pic, users.bio_text FROM users
    JOIN friendships 
    ON (friendships.accepted = true AND sender_id = users.id AND recipient_id = $1)
    OR (friendships.accepted = true AND sender_id = $1 AND recipient_id = users.id)
    WHERE users.id IN (
            SELECT users.id 
        FROM users
        JOIN friendships
        ON (friendships.accepted = true AND sender_id = users.id AND recipient_id = $2)
        OR (friendships.accepted = true AND sender_id = $2 AND recipient_id = users.id)
        )`, [loggedInUserId, otherUserId]);
};