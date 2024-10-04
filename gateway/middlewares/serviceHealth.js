// middlewares/serviceHealth.js
const services = require("../config/services");

const serviceHealthCheck = (req, res, next) => {
  const targetService = services[req.baseUrl.substring(1)];
  if (!targetService) {
    return res.status(404).send("Service not found");
  }
  next();
};

module.exports = serviceHealthCheck;
