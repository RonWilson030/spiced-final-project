const bcrypt = require("bcryptjs");

const { promisify } = require("util");

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

//user registration
exports.hash = (plainTxtPw) => {
    // salt - is the random string!
    return genSalt().then((salt) => {
        return hash(plainTxtPw, salt);
    });
};
//when user logs in, will compare what the user typed with hashed pw in the db
exports.compare = compare;
// compare takes 2 argumnents
// 1 arg: password user send from client
// 2 arg: hashed password stored in db

// if it matches ... boolean true
// if not .. boolean false
