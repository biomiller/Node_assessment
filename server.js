const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./routes/user.js");

// letting app use json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ports
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));


// routes
app.use("/user", user);

// mongoose

// connect to a locally running mongo database
let URI = 'mongodb://localhost:27017/example';
let OPTS = { useNewUrlParser: true };
mongoose.connect(URI, OPTS)
    .then(
        () => { console.log("Connected to the mongoDB at ." + URI) },
        (err) => { console.log("Failed to connect to the mongoDB at" + URI) }
    );
