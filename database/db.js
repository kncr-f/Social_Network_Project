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
                    LIMIT 4`);
};

module.exports.getMatchingUsers = (val) => {
    return db.query(`
    SELECT * FROM users
    WHERE first ILIKE $1;
    `, [val + "%"]
    );
};

