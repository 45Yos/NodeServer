const express = require('express');
const app = express();
const morganLogger = require('./loggers/morganlogger');


const LOGGER = 'morgan';

if (LOGGER === 'morgan') {
    app.use(morganLogger); // Use the morgan logger defined in loggers/morganlogger.js
}


module.exports = app;