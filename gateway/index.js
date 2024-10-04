// index.js (Main entry point)
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const responseTime = require("response-time");
const rateLimit = require("./middlewares/rateLimit");
const routes = require("./routes");
const { redisClient } = require("./utils/redisClient");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: Enable CORS for all routes
app.use(cors());

// Middleware: Helmet for basic security
app.use(helmet());

// Middleware: Rate Limiting
app.use(rateLimit);

// Middleware: Logger (using Morgan)
app.use(morgan("combined"));

// Middleware: Response Time
app.use(responseTime());

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).send("API Gateway is healthy");
});

// Use defined routes
app.use("/", routes);

// Fallback for invalid routes
app.all("*", (req, res) => {
  res.status(404).send("Invalid request");
});

// Start the gateway on the configured port
const server = app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});

// Graceful Shutdown and Redis Cleanup
const shutdown = () => {
  console.log("Shutting down the server gracefully...");
  server.close(() => {
    console.log("Server closed.");
    if (redisClient.isOpen) {
      redisClient.quit(() => {
        console.log("Redis client closed.");
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
};

// Handle SIGTERM and SIGINT for graceful shutdown
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
