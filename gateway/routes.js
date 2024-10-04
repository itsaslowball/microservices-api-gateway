// routes.js
const express = require("express");
const authenticateJWT = require("./middlewares/authenticate");
const cacheMiddleware = require("./middlewares/cache");
const serviceHealthCheck = require("./middlewares/serviceHealth");
const proxyMiddleware = require("./proxies/proxy");
const services = require("./config/services");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Apply proxy middleware with authentication and health check for each service
router.use(
  "/micro1",
  authenticateJWT,
  cacheMiddleware,
  serviceHealthCheck,
  proxyMiddleware(services.micro1)
);
router.use(
  "/micro2",
  authenticateJWT,
  cacheMiddleware,
  serviceHealthCheck,
  proxyMiddleware(services.micro2)
);
router.use(
  "/micro3",
  authenticateJWT,
  cacheMiddleware,
  serviceHealthCheck,
  proxyMiddleware(services.micro3)
);

module.exports = router;
