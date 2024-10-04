const express = require("express");
const { client, setValue, getValue } = require("./client");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

// Caching Middleware
app.use(async (req, res, next) => {
  try {
    const data = await getValue(req.url);
    if (data) {
      return res.send("Data from Redis: " + data);
    }
  } catch (err) {
    console.error("Error retrieving data from Redis:", err);
  }
  next(); 
});

// Base Route
app.get("/", async (req, res) => {
  try {
    await setValue(req.url, "Hello from Micro1", "EX", 60); 
    res.send("Data set in Redis for the base route");
  } catch (error) {
    console.error("Error setting data in Redis:", error);
    res.status(500).send("Error setting data in Redis");
  }
});

// Micro1 Route
app.get("/micro1", async (req, res) => {
  try {
    await setValue(req.url, "Hello from Micro1 route", "EX", 60); 
    res.send("Data set in Redis for /micro1 route");
  } catch (error) {
    console.error("Error setting data in Redis:", error);
    res.status(500).send("Error setting data in Redis");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Micro1 listening on port ${PORT}`);
});
