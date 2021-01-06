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

// compare email query

// insert query for the newly generated code

module.exports.getCode = () => {
    return db.query(
        "SELECT * FROM my_table WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'"
    );
};
