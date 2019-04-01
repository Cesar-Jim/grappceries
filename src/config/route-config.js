module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const listRoutes = require("../routes/lists");
    const productRoutes = require("../routes/products");
    const userRoutes = require("../routes/users");

    app.use(staticRoutes);
    app.use(listRoutes);
    app.use(productRoutes);
    app.use(userRoutes);
  }
};
