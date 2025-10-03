const joi = require('joi');

const validateCardWithJoi = (card) => {

    const webRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/


    const schema = joi.object({
        title: joi.string().min(2).max(256).required(),
        subtitle: joi.string().min(2).max(256).required(),
        description: joi.string().min(2).max(1024).required(),

        phone: joi.string()
        .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
        .rule({ message: 'Card Phone must be valid Israeli phone number' })
        .required(),

        web: joi.string()
        .ruleset.regex(webRegex)
        .rule({ message: 'Card Web must be a valid URL' })
        .allow(''),

        email: joi.string()
        .ruleset.regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: 'Card Email must be a valid email address' })
        .required(),

        image: joi.object().keys({
            url: joi.string().ruleset.regex(webRegex)
            .rule({ message: 'Card Image URL must be a valid URL' })
            .allow(''),

            alt: joi.string().min(2).max(256).allow(''),
        }),

        address: joi.object().keys({
            state: joi.string().min(2).max(256).allow(''),
            country: joi.string().min(2).max(256).required(),
            city: joi.string().min(2).max(256).required(),
            street: joi.string().min(2).max(256).required(),
            houseNumber: joi.number().greater(0).required(),
            zip: joi.number().min(1000).allow(0),
        }),

        bizNumber: joi.number().allow(''),
        user_id: joi.number().allow('')
    });

    return schema.validate(card);
};


module.exports = validateCardWithJoi;

