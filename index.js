const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");

const items = require("../routes/items");
const logger = require("../lib/logger");

const app = express();
const log = logger(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../static")));

app.use("/items", items);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  log.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});

module.exports = serverless(app);
