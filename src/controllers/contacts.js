/*******************************************
 * @desc: This file contains the controller
  functions for the routes in contacts.js
 ******************************************/

const mongodb = require("../database/mongo-connect");
const ObjectId = require("mongodb").ObjectId;

const contactsController = {};

// Data for html page
contactsController.getData = async function (req, res, next) {
  try {
    const result = await mongodb.getDb().db().collection("contacts").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* **************************
 * Get all contacts
 ****************************/
contactsController.getAll = async (req, res, next) => {
  /*
    #swagger.summary = 'Get all contacts'
    #swagger.description = 'Returns all contacts'
  */
  try {
    const result = await mongodb.getDb().db().collection("contacts").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* **************************
 * Get contact by id
 ****************************/
contactsController.getById = async (req, res, next) => {
  /*
    #swagger.summary = 'Get contact by id'
    #swagger.description = 'Returns a contact with specified id'
  */
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDb().db().collection("contacts").findOne({ _id: userId });

    if (!result) {
      return res.status(404).json({ message: "Contact not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting contact:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* *****************************************
 * POST - Insert a contact into the database
 *******************************************/
contactsController.createContact = async (req, res, next) => {
  /*
    #swagger.summary = 'Insert/Add a contact'
    #swagger.description = 'Add a contact to the database'
  */
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb.getDb().db().collection("contacts").insertOne(contact);
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res
        .status(201)
        .json({ message: "Contact created successfully.", contactId: response.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create contact. No changes made." });
    }
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* ********************************************
 * PUT - Update contact in the database by id
 **********************************************/
contactsController.updateContactById = async (req, res, next) => {
  /*
    #swagger.summary = 'Update a existing contact by id'
    #swagger.description = 'Update a existing contact in the database by id'
  */
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .replaceOne({ _id: userId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Failed to update contact. No changes made." });
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* *************************************************
 * DELETE - delete contact from the database by id
 ***************************************************/
contactsController.deleteContactById = async (req, res, next) => {
  /*
    #swagger.summary = "Delete a contact by id"
    #swagger.description = "Delete a contact in the database by id"
  */
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb.getDb().db().collection("contacts").deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found." });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = contactsController;
