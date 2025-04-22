const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const items = require("./routes/items");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from api/static
app.use(express.static(path.join(__dirname, "static")));

// Routes
app.use("/items", items);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err); // logs error to Vercel logs
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Export as serverless function
const serverless = require("serverless-http");
module.exports = serverless(app);
