// config/services.js
module.exports = {
  micro1: process.env.MICRO1_URL || "http://localhost:5000",
  micro2: process.env.MICRO2_URL || "http://localhost:4000",
  micro3: process.env.MICRO3_URL || "http://localhost:6000",
};
