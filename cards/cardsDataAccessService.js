const db = process.env.DB || "DATABASE";
const Card = require("./models/mongodb/Card");

const find = async () => {
  if (db === "DATABASE") {
    try {
      return Promise.resolve(["Card 1", "Card 2", "Card 3"]);
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
            return Promise.resolve(["My Cards:" + userId]);
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
      return Promise.resolve('card No: ' + cardId);
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
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card updateCard not in mongodb");
};




const like = async (cardId, userId) => {
  if (db === "DATABASE") {
    try {
      return Promise.resolve('card No: ' + cardId + ' liked by user: ' + userId);
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
      return Promise.resolve('card No: ' + cardId + ' removed');
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