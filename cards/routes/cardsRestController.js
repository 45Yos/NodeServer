const express = require('express');
const router = express.Router();
const { getCards, getMyCards, getCard, addCard, updateCard, deleteCard } = require('../cardService');
const handleError = require('../../utils/errorHandler');
const { like } = require('../cardsDataAccessService');



router.get('/', async (req, res) => {
     try {
        const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});




router.get('/:id', (req, res) => {
    const id = req.params.id;
    const card = getCard(id);
    try {
        res.send(`Card with ID: ${id} - ${card}`);
    } catch (error) {
        const status = error.status || 500;
        handleError(res, status, error.message);
    }
});



router.get('/mycards', (req, res) => {
    const userId = Math.floor(Math.random() * 1000);
    try {
    const card = getMyCards(userId);
    res.send(`My Cards for User ID: ${userId} - ${card}`);
    } catch (error) {
        const status = error.status || 500;
        handleError(res, status, error.message);
    }
});




router.post("/", async (req, res) => {
  try {
    const card = await addCard(req.body);
    return res.status(201).send(card);
  } catch (error) {
    console.log('Error adding card:', error);
    
    return handleError(res, error.status || 500, error.message);
  }
});



router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const card = await updateCard(id, req.body);  
        return res.send(`Card with ID: ${id} updated successfully - ${card}`);
    } catch (error) {
        const status = error.status || 500;
        handleError(res, status, error.message);
    }
});



router.patch('/:id', (req, res) => {
    const id = req.params.id;
const userId = Math.floor(Math.random() * 1000);
    const card = like(id, userId);

    try {
        res.send(`Card with ID: ${id} liked by User ID: ${userId} - ${card}`);
    } catch (error) {
        const status = error.status || 500;
        handleError(res, status, error.message);
    }
});




router.delete('/:id', (req, res) => {
    const cardId = req.params.id;
const card = deleteCard(cardId);

    try {
        res.send(`Card with ID: ${cardId} deleted successfully - ${card}`);
    } catch (error) {
        const status = error.status || 500;
        handleError(res, status, error.message);
    }
});



module.exports = router;