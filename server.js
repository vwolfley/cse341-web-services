/*******************************************
 * @desc: This server.js file is the primary file of the
 application. It is used to control the project.
 *******************************************/

const express = require("express");
const app = express();

// Import the routes from the routes folder
const routes = require("./src/routes");

// Use the routes
app.use("/", routes);

const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
  console.log("Web Server is listening at port " + (process.env.PORT || PORT));
});
