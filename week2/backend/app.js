/*******************************************
 * @desc: This app.js file is the primary file of the
 application. It is used to control the project.
 *******************************************/
const express = require('express');
const bodyParser = require('body-parser');

const professionalRoutes = require('./routes/professional');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/professional', professionalRoutes);

app.listen(8080);
