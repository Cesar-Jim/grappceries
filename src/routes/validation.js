module.exports = {
  validateProducts(req, res, next) {
    if (req.method === "POST") {
      req
        .checkParams("listId", "must be valid")
        .notEmpty()
        .isInt();
      req
        .checkBody("name", "must be at least 2 characters in length")
        .isLength({ min: 2 });
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer);
    } else {
      return next();
    }
  }
};