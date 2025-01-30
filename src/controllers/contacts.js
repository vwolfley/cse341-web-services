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

// Get all contacts
contactsController.getAll = async (req, res, next) => {
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

// Get contact by id
contactsController.getById = async (req, res, next) => {
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDb().db().collection("contacts").find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

// POST - Insert contact into the database
contactsController.createContact = async (req, res, next) => {
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
      res.status(201);
      res.json({ message: "Contact created successfully.", contactId: response.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create contact." });
    }
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

// PUT - update contact in the database
contactsController.updateContactById = async (req, res, next) => {
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
      res.status(204);
    } else {
      res.status(404).json({ message: "Failed to update contact.", error: response.error });
    }
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

// DELETE - delete contact from the database
contactsController.deleteContactById = async (req, res, next) => {
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb.getDb().db().collection("contacts").deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: "Contact not found.", error: response.error });
    }
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = contactsController;
