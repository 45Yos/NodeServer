const db = process.env.DB || "DATABASE";
const Card = require("./models/mongodb/Card");

const find = async () => {
  if (db === "DATABASE") {
    try {
      const cards = await Card.find();
      
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }

  return Promise.resolve("db is not DATABASE");
};




const findMyCards = async (userId) => {
    if (db === "DATABASE") {
        try {
            const cards = await Card.find({user_id: userId}); 
            return Promise.resolve(cards);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("db is not DATABASE");
};



const findOne = async (cardId) => {
  if (db === "DATABASE") {
    try {
      const card = await Card.findById(cardId);
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("db is not DATABASE");
};



const create = async (normalizedCard) => {

  if (db === "DATABASE") {
    try {
      
        let card = new Card(normalizedCard);
        card = await card.save();
        return Promise.resolve(card);

    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
    }
    return Promise.resolve("db is not DATABASE");
};




const update = async (cardId, normalizedCard) => {
 if (db === "DATABASE") {
    try {
      let card = await Card.findByIdAndUpdate(cardId, normalizedCard, {
        new: true,
      });

      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card updateCard not in mongodb");
};




const like = async (cardId, userId) => {
  if (db === "DATABASE") {
    try {
      let result = '';
      const card = await Card.findById(cardId);
      const cardLikes = card.likes || [];

      if (cardLikes.includes(userId)) {
        card.likes = cardLikes.pop(userId);
        result = 'User '+ userId + ' unliked card No: ' + cardId;
      } else {
        cardLikes.push(userId);
        result = 'User '+ userId + ' liked card No: ' + cardId;
      }
      card.likes = cardLikes;
      await card.save();
      
      
      return Promise.resolve(result);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("db is not DATABASE");
};




const remove = async (cardId) => {
  if (db === "DATABASE") {
    try {
      const card = await Card.findByIdAndDelete(cardId);
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("db is not DATABASE");
};




module.exports = {
  find,
  findMyCards,
  findOne,
  create,
  update,
  like,
  remove,
};