const express = require("express");
const _ = require("lodash");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.js");
const Item = require("../models/item.js");
const validators = require("../utils/validators/item.js")
const bcrypt = require("bcrypt");

module.exports = router;

router.get("/test", (req, res) => {
    res.send("This is a test!");
});

router.post("/getItems", (req, res) => {
    const errors = {};

    User.findOne({ "username": req.body.username })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                .then(match => {
                    if (match) {
                        Item.find({ "username": req.body.username })
                        .then(item => {
                            if (!item) {
                                errors.noItems = "Item not found";
                                res.status(404).json(errors);
                            }
                            res.json(item);
                        })
                        
                    } else {
                        res.status(200).send("Incorrect password.")
                    }
                })
            } else {
                res.status(404).send("User not found.")
            }
        })
});

router.post("/createItem", (req, res) => {
    const errors = {};

    let newItem = new Item({
        username: req.body.username,
        content: req.body.content
    });

    User.findOne({ "username": req.body.username })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                .then(match => {
                    if (match) {
                        newItem.save()
                        res.status(200).send("Added new Item")
                    } else {
                        res.status(200).send("Incorrect password.")
                    }
                })
            } else {
                res.status(404).send("User not found.")
            }
        })
});

router.delete("/deleteItem", (req, res) => {
    const errors = {};

    User.findOne({ "username": req.body.username })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                .then(match => {
                    if (match) {
                        Item.deleteOne({ "username": req.body.username })
                        .then((ok) => {
                            if (ok.n == 0) {
                                res.status(200).send("No items to delete.")
                            } else {
                                res.status(200).send("Item deleted.")
                            }
                        })
                    } else {
                        res.status(200).send("Incorrect password.")
                    }
                })
            } else {
                res.status(404).send("User not found.")
            }
        })
});

router.delete("/deleteAllItems", (req, res) => {
    const errors = {};

    User.findOne({ "username": req.body.username })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                .then(match => {
                    if (match) {
                        Item.deleteMany({ "username": req.body.username })
                        .then((ok) => {
                            if (ok.n == 0) {
                                res.status(200).send("No items to delete.")
                            } else {
                                res.status(200).send("All Items deleted.")
                            }
                        })
                    } else {
                        res.status(200).send("Incorrect password.")
                    }
                })
            } else {
                res.status(404).send("User not found.")
            }
        })
});
