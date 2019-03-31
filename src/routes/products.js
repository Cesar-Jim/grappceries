const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const validation = require("./validation");

router.get("/lists/:listId/products/new", productController.new);
router.post(
  "/lists/:listId/products/create",
  validation.validateProducts,
  productController.create
);
router.get("/lists/:listId/products/:id", productController.show);
router.post("/lists/:listId/products/:id/destroy", productController.destroy);
router.get("/lists/:listId/products/:id/edit", productController.edit);
router.post(
  "/lists/:listId/products/:id/update",
  validation.validateProducts,
  productController.update
);

module.exports = router;
