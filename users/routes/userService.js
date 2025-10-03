const { register,  login, find,findOne, update, changIsBizStatus, remove} = require('./usersDataAccessService');
const normalizeUser = require('../helpers/normalizeUser');
const registerValidation = require('../validations/Joi/registerValidation');
const { generateUserPassword } = require('../helpers/bcrypt');
const {
  validateRegistration,
  validateLogin,
  validateUserUpdate,
} = require("../validations/userValidationService");
const jwt = require('jsonwebtoken');
const config = require('config');



const registerUser = async (rawUser) => {
    try {
        const {error} = registerValidation(rawUser);
        if (error) {
            return Promise.reject(error);
        }


        let user = normalizeUser(rawUser);
        user.password = generateUserPassword(user.password);
        user.createdAt = new Date();

        const savedUser = await register(user);
        return savedUser;
    } catch (error) {
        throw error;
    }
};



const loginUser = async (rawUser) => {
  try {
    const { error } = validateLogin(rawUser);
    if (error) {
        console.log("validation error:", error);
      return Promise.reject(error);
    }
    
    const result = await login(rawUser);
    const { token } = result;
    

    return Promise.resolve(token);
  } catch (error) {
    return Promise.reject(error);
  }
};


const getUsers = async () => {
    try {
        const users = await find();
        return Promise.resolve(users);
    } catch (error) {
        return Promise.reject(error);
    }
};



const getUser = async (userId) => {
    try {
        const user = await findOne(userId);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};



const updateUser = async (userId, rawUser) => {
  try {
    const { error } = validateUserUpdate(rawUser);
    if (error) {
      return Promise.reject(error);
    }

    let user = normalizeUser(rawUser);
    console.log("user to update:", user);
    
    user = await update(userId, user);

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};




const changeUserBusinessStatus = async (userId) => {
    try {
        const user = await changIsBizStatus(userId);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};



const deleteUser = async (userId) => {
    try {
        const removedUser = await remove(userId);
        return Promise.resolve(removedUser);
    } catch (error) {
        return Promise.reject(error);
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    changeUserBusinessStatus,
    deleteUser
};