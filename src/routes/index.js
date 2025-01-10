/********************
 * @desc: This file is the entry point 
 * for all routes in the application.
 *******************/

// Import the express module
const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

/**
 * @desc: This is the route for the home page
 */
routes.get('/', lesson1Controller.routeTomClancy);
routes.get('/jackryan', lesson1Controller.routeJackRyan);
routes.get('/johnclark', lesson1Controller.routeJohnClark);

module.exports = routes;