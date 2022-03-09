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