/********************
 * @desc: This file is the entry point
 * for all routes in the application.
 *******************/

// Import the express module
const routes = require("express").Router();

const professionalController = require("../controllers/professional");

// GET /routes/professional
routes.get("/", professionalController.getData);
// localhost:8080/professional/

module.exports = routes;
