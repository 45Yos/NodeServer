const morgan = require('morgan');
const chalk = require('chalk');



const logger  =  morgan((tokens, req, res)=> {
if (res.statusCode >= 400) {
    return [
        chalk.redBright(tokens.date(req, res)),
        chalk.redBright(tokens.method(req, res)),
        chalk.redBright(tokens.url(req, res)),
        chalk.redBright(tokens.status(req, res)),
        chalk.redBright(tokens['response-time'](req, res) + ' ms')
    ].join(' ');
} else {
    return [
        chalk.cyanBright(tokens.date(req, res)),
        chalk.cyanBright(tokens.method(req, res)),
        chalk.cyanBright(tokens.url(req, res)),
        chalk.cyanBright(tokens.status(req, res)),
        chalk.cyanBright(tokens['response-time'](req, res) + ' ms')
    ].join(' ');
}

});



module.exports = logger;