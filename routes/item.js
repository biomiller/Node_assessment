const express = require("express");
const _ = require("lodash");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.js");
const Item = require("../models/item.js");
const bcrypt = require("bcrypt");

module.exports = router;

router.get("/test", (req, res) => {
    res.send("This is a test!");
});


// @route POST item/getItems
// @desc check username and password then display all of the user's items
// @access Public
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
                                    if (!item || !item.length) {
                                        errors.noItems = "No items found.";
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

// @route POST item/createItems
// @desc check username and password then create a new item
// @access Public
router.post("/createItem", (req, res) => {
    const errors = {};

    let newItem = new Item({
        username: req.body.username,
        title: req.body.title,
        content: req.body.content
    });

    User.findOne({ "username": req.body.username })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(match => {
                        if (match) {
                            Item.find({ "username": req.body.username, "title": req.body.title })
                                .then(item => {
                                    if (!item || !item.length) {
                                        newItem.save()
                                        res.status(200).send("Added new Item")
                                    } else {
                                        res.status(200).send("An item already exists with that title.")
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

// @route DELETE item/deleteItems
// @desc check username and password then delete oldest item
// @access Public
router.delete("/deleteItem", (req, res) => {
    const errors = {};

    User.findOne({ "username": req.body.username })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(match => {
                        if (match) {
                            Item.deleteOne({ "username": req.body.username, "title": req.body.title })
                                .then((ok) => {
                                    if (ok.n == 0) {
                                        res.status(200).send("No items exist with that title.")
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


// @route DELETE item/deleteItems
// @desc check username and password then delete all of the user's items
// @access Public
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

// @route DELETE item/deleteItems
// @desc check username and password then delete oldest item
// @access Public
router.put("/updateItem", (req, res) => {
    const errors = {};

    User.findOne({ "username": req.body.username })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(match => {
                        if (match) {
                            Item.updateOne({ "username": req.body.username, "title": req.body.title },
                                {
                                    $set: {
                                        "content": req.body.content,
                                    }
                                })
                                .then((ok) => {
                                    if (ok.n == 0) {
                                        res.status(200).send("No items exist with that title.")
                                    } else {
                                        res.status(200).send("Item content updated.")
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
