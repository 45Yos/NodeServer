const config = require('config');
const Env = config.get('NODE_ENV') || 'development';


const connectToDB = () => {
    if (Env === 'development') {
        require('./mongoDB/connectLocally');
    }

    if (Env === 'production') {
        require('./mongoDB/connectToAtlas');
    }
}


module.exports = connectToDB;