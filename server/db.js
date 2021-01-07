const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:password@localhost:5432/socialnetwork"
);

module.exports.registerUser = (first, last, email, password) => {
    const q =
        "INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id";
    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.getUserByEmail = (email) => {
    return db.query("SELECT * FROM users WHERE email=$1", [email]);
};

module.exports.getUserById = (id) => {
    return db.query("SELECT * FROM users WHERE id=$1", [id]);
};

module.exports.addCode = (email, code) => {
    const q =
        "INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING id";
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getCode = (code) => {
    return db.query(
        `SELECT * 
        FROM reset_codes 
        WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'
        AND code = $1`,
        [code]
    );
};

module.exports.updatePassword = (email, password) => {
    const q = `UPDATE users
    SET password=$2
    WHERE email=$1
    RETURNING id`;
    const params = [email, password];
    return db.query(q, params);
};

module.exports.updateProfilePic = (userId, url) => {
    return db.query(
        `
    UPDATE users
    SET profile_pic=$2
    WHERE id=$1
    RETURNING id`,
        [userId, url]
    );
};
