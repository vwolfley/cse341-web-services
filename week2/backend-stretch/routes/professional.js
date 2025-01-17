/********************
 * @desc: This file is the entry point
 * for all routes in the application.
 *******************/

// Import the express module
const express = require("express");
const router = express.Router();

const professionalController = require("../controllers/professional");

// GET /routes/professional
router.get("/", professionalController.getData);
// localhost:8080/professional/

module.exports = router;
