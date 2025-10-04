const db = process.env.DB || "DATABASE";
const { generateAuthToken } = require('../../auth/Providers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const User = require('../models/mongodb/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validateUserUpdate } = require('../validations/userValidationService');




const register = async (normalizedUser) => {
    if (db === "DATABASE") {
        try {
            let user = new User(normalizedUser);
            user = await user.save();

            return user;
        } catch (error) {
            error.status = 400;
            throw error;
        }
    }
};





const login = async ({ email, password }) => {    
  if (db === "DATABASE") {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Authentication Error: Invalid email");

      const validPassword = comparePassword(password, user.password);
      if (!validPassword)
        throw new Error("Authentication Error: Invalid Password");


          const tokenPayload = {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness
    };
    

    const token = jwt.sign(tokenPayload, config.get('JWT_KEY'));
      
    
      
      
      return Promise.resolve({ user, token });
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  console.log(db);
  
  return Promise.resolve("loginUser user not in mongodb");
};

    



const find = async () => {
  if (db === "DATABASE") {
    try {
      const users = await User.find({}, { password: 0, __v: 0 });
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};




const findOne = async (userId) => {
    try {
      const user = await User.findById(userId, { password: 0, __v: 0 });
      
        return Promise.resolve(user);
    } catch (error) {
        error.status = 404;
        return Promise.reject(error);
    }
};



const update = async (userId, normalizedUser) => {
  if (db === "DATABASE") {
    try {

       const { error } = validateUserUpdate(normalizedUser);
    if (error) {
      return Promise.reject(error);
    }

    const { createdAt, ...dataToUpdate } = normalizedUser;

    dataToUpdate.updatedAt = new Date();

      
      const updatedUser = await User.findByIdAndUpdate(
        userId,            
        dataToUpdate,      
        { new: true }         
      );
      
      if (!updatedUser) {
        throw new Error("User not found");
      }
    
      return Promise.resolve(updatedUser);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }

  return Promise.resolve("card update not in mongodb");
};




const changeIsBizStatus = async (userId) => {
    try {
      const user = await User.findById(userId);
      user.isBusiness = true;
      await user.save();
      console.log(user);
      
      
        return Promise.resolve('user No: ' + userId + ' ' + user.name.first + ' Is Bussiness!');
    } catch (error) {
        error.status = 404;
        return Promise.reject(error);
    }
};



const remove = async (userId) => {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
        return Promise.resolve('user No: ' + userId + ' ' + deletedUser.name.first + ' removed');
    } catch (error) {
        error.status = 404;
        return Promise.reject(error);
    }
};






module.exports = {
    register,
    login,
    find,
    findOne,
    update,
    changeIsBizStatus,
    remove
};