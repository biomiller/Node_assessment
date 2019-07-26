const express = require("express");
const _ = require("lodash");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.js");
const validators = require("../utils/validators/user.js")
const bcrypt = require("bcrypt");

router.get("/test", (req, res) => {
    res.send("This is a test!");
});

router.get("/getAll", (req, res) => {
    const errors = {};
    User.find({}, '-password')
        .then(users => {
            if (!users) {
                errors.noUsers = "There are no users";
                res.status(404).json(errors);
            }
            res.json(users);
        })
        .catch(err => res.status(404).json({ noItems: "There are no users" }));
});

// @route DELETE items/deleteManyItems
// @desc deletes all items
// @access Public
router.delete("/deleteAllUsers", (req, res) => {

    User.deleteMany({})
        .then(() => res.status(200).send("All users deleted"))
        .catch(err => res.status(404).json({ noItems: "Users not deleted." }))

});

router.post("/register", (req, res) => {

    let ve = validators.validateEmail(req.body);
    let vp = validators.validatePassword(req.body);

    if (ve.isValid && vp.isValid) {

        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                newUser.password = hash
                newUser.save()
                res.status(200).send("Added new User")
            })
            .catch(err => res.status(404).json({ noItems: "User not added." }))

    } else if (ve.isValid == false) {
        res.status(404).send(ve.errors);
    } else if (vp.isValid == false) {
        res.status(404).send(vp.errors);
    } else {
        console.log(ve.errors);
        console.log(vp.errors);
    }

});

module.exports = router;