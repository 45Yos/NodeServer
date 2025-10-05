const express = require('express');
const chalk = require('chalk');
const app = express();
const handleError = require('./utils/errorHandler');
const router = require('./router');
const cors = require('./middlewares/cors');
const connectToDB = require('./DB/dbService');
const config = require('config');
const mongoose = require('mongoose');
const PORT = config.get('PORT');
const logger = require('./logger/loggers/morganlogger');
const { generateInitialUsers, generateInitialCards } = require('./initialData/initialDataService');


app.use(logger); // Use the custom Morgan logger middleware
app.use(cors); // Use the CORS middleware defined in middlewares/cors.js
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.text()); // Middleware to parse text bodies
app.use(express.static('public')); // Serve static files from 'public' directory
app.use(router);


const schema = new mongoose.Schema({
  string: String,
  number: Number,
  boolean: Boolean,
  date: { type: Date, default: Date.now },
});

const Test = mongoose.model('Test', schema);

app.post('/', async (req, res) => {
  try {
    const dataFromBody = req.body;
    const obj = new Test(dataFromBody);
    const data = await obj.save();
    res.send(data);
  } catch (error) {
    console.log(chalk.redBright('Mongoose Schema Error:', error.message));
    res.status(400).send(error.message);
  }
});


app.get('/', async (req, res) => {
  try {
    const documents = await Test.find();
    res.send(documents);
  } catch (error) {
    console.log(chalk.redBright('Mongoose Schema Error:', error.message));
    res.status(400).send(error.message);
  }
});
    

app.get('/query', async (req, res) => {
  try {
    const filterDocuments = await Test.find({ number: { $gt: 5, $lt: 100 } });
    res.send(filterDocuments);
  } catch (error) {
    console.log(chalk.redBright('Mongoose Schema Error:', error.message));
    res.status(400).send(error.message);
  }
});


app.get('/filter', async (req, res) => {
  try {
    const filterDocuments = await Test.find({}, { string: 1, date: 1} // Will return only the 'string', 'date' and '_id' fields
    );
    res.send(filterDocuments);
  } catch (error) {
    console.log(chalk.redBright('Mongoose Schema Error:', error.message));
    res.status(400).send(error.message);
  }
});



app.get('/find-one', async (req, res) => {
  try {
    const Document = await Test.findone({string: 'example'}); // Will return the first document that matches the condition
    res.send(Document);
  } catch (error) {
    console.log(chalk.redBright('Mongoose Schema Error:', error.message));
    res.status(400).send(error.message);
  }
});

  app.use((err, req, res) => {
    console.log(chalk.redBright(err.message));
    handleError(res, err.status || 500, err.message)
  });

app.listen(PORT, () => {
  console.log(chalk.green(`\n\n\n Server is running on http://localhost:${PORT} \n`));
  connectToDB();
  // generateInitialUsers();
  // generateInitialCards();
});



