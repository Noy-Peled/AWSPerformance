const performanceController = require("./controller/performanceController");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Initializes the express app and sets the server to run on port 8080.
const app = express();
const port = 8080;

// Enables requests from different domains to the server.
app.use(cors());

// Routing to performance controller.
app.use("/performance", performanceController);

// Start application with the server's port.
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
