const express = require("express");
const cors = require("cors");
const apiRouter = require("./api");

const app = express();
const PORT = 6000;

// Middleware
app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

// API Routes

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello this is micro3 service");
});

app.use("/micro3", apiRouter);

app.listen(PORT, () => {
  console.log(`Micro3 listening on port ${PORT}`);
});
