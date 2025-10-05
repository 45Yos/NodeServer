const express = require('express');
const router = express.Router();
const { getCards, getMyCards, getCard, addCard, updateCard, deleteCard } = require('../cardService');
const handleError = require('../../utils/errorHandler');
const { like } = require('../cardsDataAccessService');
const {auth, authIsB} = require('../../auth/authService');
const jwt = require('jsonwebtoken');



router.get('/', async (req, res) => {
     try {
        const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});



router.get('/mycards', auth, async (req, res) => {
    
    try {
        const userToken = req.header('x-auth-token');
        const user = jwt.decode(userToken);
        const userId = user._id;
        
        const cards = await getMyCards(userId);
        
        res.send(cards);
    } catch (error) {
        const status = error.status || 500;
        handleError(res, status, error.message);
    }
});


router.get('/:id', async (req, res) => {
    const cardId = req.params.id;
    const card = await getCard(cardId);
    try {
        res.send(card);
    } catch (error) {
        const status = error.status || 500;
        handleError(res, status, error.message);
    }
});



//Post
router.post("/", authIsB, async (req, res) => {
  try {
    const userToken = req.header("x-auth-token");
    const user = jwt.decode(userToken);
    const userId = user._id;
    const card = await addCard(req.body, userId);
    return res.status(201).send(card);
  } catch (error) {
    console.log('Error adding card:', error);
    
    return handleError(res, error.status || 500, error.message);
  }
});




//Put
router.put('/:id', auth,  async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        const user = jwt.decode(token);
        const userId = user._id; 
        const cardId = req.params.id;
        const card = await updateCard(cardId, req.body); 

        if(userId !== card.user_id.toString()) {
            return handleError(res, 403, "Forbidden - You can only update your own cards");
        }
        return res.send('Card updated successfully - ' + card);
    } catch (error) {
        const status = error.status || 500;
        handleError(res, status, error.message);
    }
});




//Patch
router.patch('/:id', auth, async (req, res) => {
    const cardid = req.params.id;
    const token = req.header('x-auth-token');
    const user = jwt.decode(token);
    const userId = user._id;
    
    
    const card = await like(cardid, userId);

    try {
        res.send(card);
    } catch (error) {
        const status = error.status || 500;
        handleError(res, status, error.message);
    }
});






//Delete
router.delete('/:id', auth, async (req, res) => {
    try {
    const cardId = req.params.id;
    const card = await deleteCard(cardId);
    console.log('Deleted card:', card);
    

        res.send(card);
    } catch (error) {
        const status = error.status || 500;
        handleError(res, status, error.message);
    }
});



module.exports = router;