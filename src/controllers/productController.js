const productQueries = require("../db/queries.products.js");

module.exports = {
  new(req, res, next) {
    res.render("products/new", { listId: req.params.listId });
  },

  create(req, res, next) {
    let newProduct = {
      name: req.body.name,
      purchased: false,
      listId: req.params.listId
    };
    productQueries.addProduct(newProduct, (err, product) => {
      if (err) {
        res.redirect(500, `/lists/${newProduct.listId}`);
      } else {
        res.redirect(303, `/lists/${newProduct.listId}`);
      }
    });
  },

  show(req, res, next) {
    productQueries.getProduct(req.params.id, (err, product) => {
      if (err || product == null) {
        res.redirect(404, "/");
      } else {
        res.render("products/show", { product });
      }
    });
  },

  destroy(req, res, next) {
    productQueries.deleteProduct(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        res.redirect(
          500,
          `/lists/${req.params.listId}/products/${req.params.id}`
        );
      } else {
        res.redirect(303, `/lists/${req.params.listId}`);
      }
    });
  },

  edit(req, res, next) {
    productQueries.getProduct(req.params.id, (err, product) => {
      if (err || product == null) {
        res.redirect(404, "/");
      } else {
        res.render("products/edit", { product });
      }
    });
  },

  update(req, res, next) {
    productQueries.updateProduct(req.params.id, req.body, (err, product) => {
      if (err || product == null) {
        res.redirect(
          404,
          `/lists/${req.params.listId}/products/${req.params.id}/edit`
        );
      } else {
        res.redirect(`/lists/${req.params.listId}/products/${req.params.id}`);
      }
    });
  }
};
