const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, getUser, updateUser } = require('./userService');
const { changeIsBizStatus } = require('./usersDataAccessService');
const {auth} = require('../../auth/authService');
const handleError = require('../../utils/errorHandler');






// GET
router.get('/', auth, async (req, res) => {
try {
    const {isAdmin} = req.user;
    if (!isAdmin) {
        return handleError(res, 403, 'Authorization Error: Must be admin!');
    }
    const users = await getUsers();
    
    res.status(200).send(users);
} catch (error) {
    handleError(res, error.status || 500, error.message);
}
});



router.get('/:id', auth, async (req, res) => {
    try {
    const userId = req.params.id;
    const {_id, isAdmin} = req.user;
    if (_id !== userId && !isAdmin) {
        handleError(res, 403, 'Authorization Error: Must be admin or the user himself!');
    }
    
    
    const user = await getUser(userId);
    console.log(user);
    
    return res.status(200).send(user);
} catch (error) {
    handleError(res, error.status || 500, error.message);
}
});






//POST
router.post('/', async (req, res) => {

    try {
const user = await registerUser(req.body);
res.status(201).send(user);
    } catch (error) {
        handleError(res, error.status || 500, error.message);
    }
});



router.post('/login', async (req, res) => {
try {
    const user = await loginUser(req.body);
    res.status(200).send(user);
} catch (error) {
    handleError(res, error.status || 500, error.message);
}
});







// PUT
router.put('/:id', (req, res) => {
    try {
    const userId = req.params.id;
    const user = updateUser(userId, req.body);
    res.status(200).send(user);
    } catch (error) {
        handleError(res, error.status || 500, error.message);
    }
});






// PATCH
router.patch('/:id', (req, res) => {
    try {
    const userId = req.params.id;
    const user = changeIsBizStatus(userId);

    if (!user) return res.status(404).send('User not found');

    res.status(200).send(user);

    } catch (error) {
        handleError(res, error.status || 500, error.message);
    }
});








// DELETE
router.delete('/:id', (req, res) => {

    try {
    const userId = req.params.id;
    const user = deleteUser(userId);

    if (!user) return res.status(404).send('User not found');

    res.status(200).send(user);
    } catch (error) {
        handleError(res, error.status || 500, error.message);
    }
});




module.exports = router;
    