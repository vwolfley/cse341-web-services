const express = require("express");
const router = express.Router();

router.use("/", require("./lesson1"));
router.use("/contacts", require("./contacts"));

module.exports = router;
