/*******************************************
 * @desc: This file contains the controller
  functions for the routes in lesson1.js
 ******************************************/
const routeTomClancy = (req, res) => {
    res.send("Tom Clancy");
};

const routeJackRyan = (req, res) => {
    res.send("Jack Ryan");
};

const routeJohnClark = (req, res) => {
    res.send("John Clark");
};

module.exports = {
    routeTomClancy,
    routeJackRyan,
    routeJohnClark,
};
