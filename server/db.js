const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:password@localhost:5432/spicedfinalproject"
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
    return db.query(
        `SELECT users.id, users.first, users.last, users.email, users.profile_pic, users.bio
        FROM users
        WHERE id=$1`,
        [id]
    );
};

module.exports.searchForUsers = (val) => {
    return db.query(
        `SELECT * FROM users WHERE first ILIKE $1 OR last ILIKE $1 ;`,
        [val + "%"]
    );
};

module.exports.getOtherUserById = (id) => {
    return db.query(
        `SELECT *
        FROM users
        WHERE id=$1`,
        [id]
    );
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

module.exports.updateBio = (userId, bio) => {
    return db.query(
        `
    UPDATE users
    SET bio=$2
    WHERE id=$1
    RETURNING id, bio`,
        [userId, bio]
    );
};

module.exports.getFriendshipStatus = ({ userId, otherUserId }) => {
    return db.query(
        `SELECT *
        FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)`,
        [userId, otherUserId]
    );
};

module.exports.makeRequest = ({ userId, otherUserId }) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id)
        VALUES ($1, $2)
        RETURNING sender_id, recipient_id, accepted`,
        [userId, otherUserId]
    );
};

module.exports.cancelRequest = ({ userId, otherUserId }) => {
    return db.query(
        `DELETE FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`,
        [userId, otherUserId]
    );
};

module.exports.acceptRequest = ({ userId, otherUserId }) => {
    return db.query(
        `UPDATE friendships
        SET accepted = true
        WHERE sender_id = $2
        AND recipient_id = $1
        RETURNING sender_id, recipient_id, accepted`,
        [userId, otherUserId]
    );
};

module.exports.getFriends = (userId) => {
    return db.query(
        `SELECT users.id, first, last, profile_pic, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`,
        [userId]
    );
};
// check getFriends!! users.first?

module.exports.addFavourites = (title, imageUrl, url, favouriteId) => {
    return db.query(
        `
    INSERT INTO favourites (title, imageUrl, url, favouriteId)
    VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, imageUrl, url, favouriteId]
    );
};

module.exports.getUserFavouriteRecipes = (userId) => {
    return db.query(
        `SELECT recipes.*
        FROM recipes
        JOIN favourites
        ON recipes.id = favourites.recipe_id
        WHERE favourites.user_id = $1`,
        [userId]
    );
};

module.exports.getFavouriteRecipeUrl = (userId, recipeId) => {
    return db.query(
        `SELECT recipes.*
        FROM recipes
        JOIN favourites
        ON recipes.remote_id = $2
        WHERE favourites.user_id = $1`,
        [userId, recipeId]
    );
};

module.exports.addRecipe = (title, imageUrl, url, remoteId) => {
    return db.query(
        `INSERT INTO recipes (title, imageurl, url, remote_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [title, imageUrl, url, remoteId]
    );
};

module.exports.getRecipeByRemoteId = (userId, recipeId) => {
    return db.query(
        `SELECT 
        recipes.*,
        COALESCE((SELECT favourites.id FROM favourites WHERE user_id = $1 AND recipes.id = favourites.recipe_id), NULL) favourite_id
        FROM recipes
        WHERE recipes.remote_id = $2`,
        [userId, recipeId]
    );
};

module.exports.addFavourite = (userId, recipeId) => {
    return db.query(
        `INSERT INTO favourites (user_id, recipe_id)
        VALUES ($1, $2)
        RETURNING id`,
        [userId, recipeId]
    );
};

module.exports.deleteFavourite = (userId, recipeId) => {
    return db.query(
        `DELETE FROM favourites
        WHERE user_id = $1 AND recipe_id = $2`,
        [userId, recipeId]
    );
};

// module.exports.getFavourites = (userId) => {
//     return db.query(
//         `SELECT *
//         FROM favourites
//         WHERE user_id = $1`,
//         [userId]
//     );
// };

module.exports.addListItem = (userId, item) => {
    return db.query(
        `INSERT INTO shopping_list (user_id, item)
        VALUES ($1, $2)
        RETURNING *`,
        [userId, item]
    );
};

module.exports.getShoppingList = (userId) => {
    return db.query(
        `SELECT * FROM shopping_list
        WHERE user_id = $1`,
        [userId]
    );
};

module.exports.deleteListItem = (userId, itemId) => {
    return db.query(
        `DELETE FROM shopping_list
        WHERE user_id = $1 AND shopping_list.id = $2`,
        [userId, itemId]
    );
};

module.exports.addChatMessage = (userId, message) => {
    return db.query(
        `INSERT INTO chat_messages (user_id, message)
        VALUES ($1, $2)
        RETURNING id, timestamp`,
        [userId, message]
    );
};

module.exports.getMessages = () => {
    return db.query(
        `SELECT
            chat_messages.id,
            chat_messages.message,
            chat_messages.user_id,
            chat_messages.timestamp,
            users.first,
            users.last,
            users.profile_pic
        FROM chat_messages
        JOIN users
        ON chat_messages.user_id = users.id`
    );
};
