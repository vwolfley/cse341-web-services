/*******************************************
 * @desc: This file contains the controller
  functions for the routes in contacts.js
 ******************************************/

const mongodb = require("../database/mongo-connect");
const ObjectId = require("mongodb").ObjectId;

const contactsController = {}

// Data for html page
contactsController.getData = async function (req, res, next) {
  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
}

contactsController.getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

contactsController.getById = async (req, res, next) => {
  // const userId = new ObjectId(req.params.id);
  const userId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

module.exports = contactsController
