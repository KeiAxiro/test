const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const port = process.env.PORT;

// public static assets
app.use("/static", express.static("public"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//view
var indexRouter = require("./routes/index");

app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
