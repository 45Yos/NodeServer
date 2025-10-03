const data = require('./initialData.json');
const normalizeUser = require('../users/helpers/normalizeUser');
const normalizeCard = require('../cards/helpers/normalizeCard');
const {register} = require('../users/routes/usersDataAccessService');
const {create} = require('../cards/cardsDataAccessService');
const {generateUserPassword} = require('../users/helpers/bcrypt');
const chalk = require('chalk');

const generateInitialCards = async () => {
    console.log('Generating initial cards...');
    
    const {cards} = data;
    cards.forEach(async (card) => {
        try {
            const userId = '64a7f3f4f1c2b8e8b4d6e8c1';
             card = await normalizeCard(card, userId);
            await create(card);
        } catch (error) {
            return console.log(chalk.redBright('Initial Cards Error:', error.message));
            
        }
    });

};


const generateInitialUsers = async () => {
    const {users} = data;
    users.forEach(async (user) => {
        try {
            user = await normalizeUser(user);
            user.password = generateUserPassword(user.password);
            await register(user);
        } catch (error) {
            return console.log(chalk.redBright('Initial Users Error:', error.message));
        }
    });
};


module.exports = {
    generateInitialUsers,
    generateInitialCards,
};
