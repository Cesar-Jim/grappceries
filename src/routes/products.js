const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/lists/:listId/products/new", productController.new);
router.post("/lists/:listId/products/create", productController.create);
router.get("/lists/:listId/products/:id", productController.show);
router.post("/lists/:listId/products/:id/destroy", productController.destroy);
router.get("/lists/:listId/products/:id/edit", productController.edit);
router.post("/lists/:listId/products/:id/update", productController.update);

module.exports = router;
