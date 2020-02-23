"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

const port = 8000;
const testRoutes = require("./routes/testRoutes");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

let hbs = require("express-handlebars");

let hbsHelpers = hbs.create({
    helpers: require("./helpers/handlesbars").helpers,
    layoutsDir: path.join(__dirname, "views", "layouts"),
    defaultLayout: "main-layout",
    extname: ".hbs",
});

app.engine(".hbs", hbsHelpers.engine);

app.set("view engine", ".hbs");
// app.set("views", "views");

app.listen(process.env.PORT || port, () => {
    console.log(`Server listening on port: ${port}`);
});

app.use(testRoutes);
