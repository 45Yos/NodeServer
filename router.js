const express = require('express');
const router = express.Router();
const cardsController = require('./cards/routes/cardsRestController');
const usersRestController = require('./users/routes/usersRestController');
const e = require('express');


router.use("/cards", cardsController);
router.use("/users", usersRestController);


router.get('/', (req, res) => {
    res.send('Welcome to the main router!');
});

router.use((req, res) => handleError(res, 404, 'Not Found'));


module.exports = router;