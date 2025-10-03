const express = require('express');
const cors = require('cors');
const app = express();



app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:5500',
    ],

    optionsSuccessStatus: 200, 
})
); 


module.exports = app;
