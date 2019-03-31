module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const listRoutes = require("../routes/lists");
    const productRoutes = require("../routes/products");

    app.use(staticRoutes);
    app.use(listRoutes);
    app.use(productRoutes);
  }
};
