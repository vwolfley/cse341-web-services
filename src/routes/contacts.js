/********************
 * @desc: This file is the entry point 
 * for all routes in the application.
 *******************/

// Import the express module
const express = require('express')
const router = express.Router();
const contactsController = require("../controllers/contacts");

/**
 * @desc: These are the routes for the professional controller
 */
router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getById);

module.exports = router;

