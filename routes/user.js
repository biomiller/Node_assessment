const express = require("express");
const _ = require("lodash");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.js");
const validators = require("../utils/validators/user.js")
const bcrypt = require("bcrypt");

module.exports = router;

router.get("/test", (req, res) => {
    res.send("This is a test!");
});

// @route GET user/getAll
// @desc gets all users
// @access Public
router.get("/getAll", (req, res) => {
    const errors = {};
    User.find({}, '-password')
        .then(users => {
            if (!users) {
                errors.noUsers = "There are no users.";
                res.status(404).json(errors);
            }
            res.json(users);
        })
        .catch(err => res.status(404).send("There are no users." ));
});

// @route DELETE user/deleteAllUsers
// @desc deletes all users
// @access Public
router.delete("/deleteAllUsers", (req, res) => {

    User.deleteMany({})
        .then(() => res.status(200).send("All users deleted."))
        .catch(err => res.status(404).send("There are no users."))

});

// @route POST user/register
// @desc create a new user if one does not exist with the same username or password
// @access Public
router.post("/register", (req, res) => {

    let ve = validators.validateEmail(req.body);
    let vp = validators.validatePassword(req.body);
    let vu = validators.validateUsername(req.body);

    if (ve.isValid && vp.isValid && vu.isValid) {

        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        User.findOne({ $or: [{ "username": req.body.username }, { "email": req.body.email }] })
            .then(user => {
                if (!user) {

                    bcrypt.hash(req.body.password, 10)
                        .then((hash) => {
                            newUser.password = hash
                            newUser.save()
                            res.status(200).send("Added new User.")
                        })
                        .catch(err => res.status(404).send("User not added."))

                } else if (user.username != newUser.username && user.email != newUser.email) {

                    bcrypt.hash(req.body.password, 10)
                        .then((hash) => {
                            newUser.password = hash
                            newUser.save()
                            res.status(200).send("Added new User.")
                        })
                        .catch(err => res.status(404).send("User not added." ))

                } else if (user.username == newUser.username) {
                    res.status(404).send("A user with that username already exists.");
                } else if (user.email == newUser.email) {
                    res.status(404).send("A user with that email already exists.");
                }

            })

    } else if (ve.isValid == false) {
        res.status(404).send(ve.errors);
    } else if (vp.isValid == false) {
        res.status(404).send(vp.errors);
    } else if (vu.isValid == false) {
        res.status(404).send(vu.errors);
    }
})


// @route POST user/login
// @desc login if existing user and password matches 
// @access Public
router.post("/login", (req, res) => {

    User.findOne({ "username": req.body.username })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                .then(match => {
                    if (match) {
                        res.status(200).send("Logged in.")
                    } else {
                        res.status(200).send("Incorrect password.")
                    }
                })
            } else {
                res.status(404).send("No user found.")
            }
        })
});




