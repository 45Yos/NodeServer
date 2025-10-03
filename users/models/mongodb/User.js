const mongoose = require('mongoose');
const {DEFAULT_VALIDATION, PHONE_VALIDATION, MAIL_VALIDATION, PASSWORD_VALIDATION, URL} = require('../../helpers/userValidations');  
const { required } = require('joi');



const userSchema = new mongoose.Schema({
    name: {
        first: DEFAULT_VALIDATION,
        last: DEFAULT_VALIDATION,
        },

        phone: PHONE_VALIDATION,
        email: MAIL_VALIDATION,
        password: PASSWORD_VALIDATION,

        image: {
            url: URL,
            alt: DEFAULT_VALIDATION,
        },

        address: {

            state: {
                type: String,
                minLength: 2,
            },

            city: DEFAULT_VALIDATION,
            street: DEFAULT_VALIDATION,

            houseNumber: {
                type: Number,
                required: true
            },

            zip: Number,

        },

        isAdmin: {
            type: Boolean,
            default: false
        },

        isBusiness: {
            type: Boolean,
            default: false
        },

        createdAt: {
            type: Date,
            default: Date.now
        },

    });


    const User = mongoose.model('User', userSchema);
    module.exports = User;