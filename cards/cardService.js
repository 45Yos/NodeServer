const {find, findMyCards, findOne, create, update, like, remove} = require('./cardsDataAccessService');
const validateCard = require('./validations/cardValidationService');
const normalizeCard = require('./helpers/normalizeCard');



const getCards = async () => {
    try {
    const cards = await find();
    return Promise.resolve(cards);
    } catch (error) {
return Promise.reject(error);
    }
};



const getMyCards = async (userId) => {
    const card = await findMyCards(userId);
    try {
    return Promise.resolve(card);
    } catch (error) {
return Promise.reject(error);
    }
};




const getCard = async (cardId) => {
    const card = await findOne(cardId);
    try {
    return Promise.resolve(card);
    } catch (error) {
return Promise.reject(error);
    }
};



const addCard = async (rawCard) => {
    
    try {
    const {error} = validateCard(rawCard);
    if (error) {
        return Promise.reject(error);
    }


    let card = await normalizeCard(rawCard);
    card = await create(card);

    return Promise.resolve(card);
    } catch (error) {
return Promise.reject(error);
    }
};





const updateCard = async (cardId, rawCard) => {
    try {
    const card = {...rawCard};
        console.log('Updating card with data:', card);
        
    
    const updatedCard = await update(cardId, rawCard);
    return Promise.resolve(updatedCard);
    } catch (error) {
return Promise.reject(error);
    }
};



const likeCard = async (cardId, userId) => {
    try {
        const card = await like(cardId, userId);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};



const deleteCard = async (cardId) => {
    try {
        const card = await remove(cardId);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};





module.exports = {
    getCards,
    getMyCards,
    getCard,
    addCard,
    updateCard,
    likeCard,
    deleteCard,
};
    