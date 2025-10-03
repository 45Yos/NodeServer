const vlaidateCardWithJoi = require('./joi/validateCardWithJoi');

const validtor = undefined || 'Joi';

const validateCard = (card) => {
    if (validtor === 'Joi') {
        return vlaidateCardWithJoi(card);
    }
    return true;
};

module.exports = validateCard;