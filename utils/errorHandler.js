const chalk = require('chalk');

const handleError = (res, status, message = '') => {
    console.error(chalk.red(message));
    res.status(status).send(message);
}

module.exports = handleError;
    