/********************
 * @desc: This file is the entry point
 * for all routes in the application.
 *******************/

// Import the express module
const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

/**
 * @desc: These are the routes for the contacts controller
 */
// Get all contacts
router.get("/", contactsController.getAll);
// Get contact by id
router.get("/:id", contactsController.getById);

module.exports = router;
