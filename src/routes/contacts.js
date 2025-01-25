/********************
 * @desc: This file is the entry point
 * for all routes in the application.
 *******************/

// Import the express module
const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

// Get all contacts
router.get("/", contactsController.getAll);
// Get contact by id
router.get("/:id", contactsController.getById);
// Insert one contact into the database
router.post("/", contactsController.createContact);
// Update contact by id
router.put("/:id", contactsController.updateContactById);
// Delete contact by id
router.delete("/:id", contactsController.deleteContactById);

module.exports = router;
