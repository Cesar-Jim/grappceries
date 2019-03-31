const Product = require("./models").Product;
const List = require("./models").List;

module.exports = {
  addProduct(newProduct, callback) {
    return Product.create(newProduct)
      .then(product => {
        callback(null, product);
      })
      .catch(err => {
        callback(err);
      });
  },

  getProduct(id, callback) {
    return Product.findById(id)
      .then(product => {
        callback(null, product);
      })
      .catch(err => {
        callback(err);
      });
  },

  deleteProduct(id, callback) {
    return Product.destroy({
      where: { id }
    })
      .then(deletedRecordsCount => {
        callback(null, deletedRecordsCount);
      })
      .catch(err => {
        callback(err);
      });
  },

  updateProduct(id, updatedProduct, callback) {
    return Product.findById(id).then(product => {
      if (!product) {
        return callback("Product not found");
      }

      product
        .update(updatedProduct, {
          fields: Object.keys(updatedProduct)
        })
        .then(() => {
          callback(null, product);
        })
        .catch(err => {
          callback(err);
        });
    });
  }
};
