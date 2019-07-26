const express = require("express");
const _ = require("lodash");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.js");
const validators = require("../utils/validators/item.js")
const bcrypt = require("bcrypt");

module.exports = router;

router.get("/test", (req, res) => {
    res.send("This is a test!");
});