const express = require("express");
const router = express.Router();

// Get all products
router.get("/", (req, res) => {
  res.send("Hello from Micro3");
});

// Create a product
router.post("/", (req, res) => {
  res.send("Product created");
});

// Get a product by ID
router.get("/:id", (req, res) => {
  res.send(`Product ${req.params.id}`);
});

// Update a product by ID
router.put("/:id", (req, res) => {
  res.send(`Product ${req.params.id} updated`);
});

// Delete a product by ID
router.delete("/:id", (req, res) => {
  res.send(`Product ${req.params.id} deleted`);
});

module.exports = router;
