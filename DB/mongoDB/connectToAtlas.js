const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect('mongodb+srv://tyossi91:y9342871@cluster-y.gk4j0nq.mongodb.net/MyProjectDB')
.then(() => console.log(chalk.magentaBright('Connect To Atlas MongoDB!')))
.catch((error) => {
    console.log(chalk.redBright(error));
});