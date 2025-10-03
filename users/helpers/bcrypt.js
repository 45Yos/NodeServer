const bcrypt = require('bcryptjs');

const generateUserPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};


const comparePassword = (enteredPassword, hashedPassword) => {
    return bcrypt.compareSync(enteredPassword, hashedPassword);
};


module.exports = {
    generateUserPassword,
    comparePassword,
};