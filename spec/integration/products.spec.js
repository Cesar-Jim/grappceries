const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists";

const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Product = require("../../src/db/models").Product;

describe("routes : products", () => {
  beforeEach(done => {
    this.list;
    this.product;

    sequelize.sync({ force: true }).then(res => {
      List.create({
        name: "Family List"
      }).then(list => {
        this.list = list;

        Product.create({
          name: "Apples",
          purchased: false,
          listId: this.list.id
        })
          .then(product => {
            this.product = product;
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("GET /lists/:listId/products/new", () => {
    it("should render a new product form", done => {
      request.get(`${base}/${this.list.id}/products/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Add Product");
        done();
      });
    });
  });

  describe("POST /lists/:listId/products/create", () => {
    it("should create a new product and redirect", done => {
      const options = {
        url: `${base}/${this.list.id}/products/create`,
        form: {
          name: "Watermelon",
          purchased: false
        }
      };
      request.post(options, (err, res, body) => {
        Product.findOne({ where: { name: "Watermelon" } })
          .then(product => {
            expect(product).not.toBeNull();
            expect(product.name).toBe("Watermelon");
            expect(product.purchased).toBe(false);
            expect(product.listId).not.toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("GET /lists/:listId/products/:id", () => {
    it("should render a view with the selected product", done => {
      request.get(
        `${base}/${this.list.id}/products/${this.product.id}`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain(this.product.name);
          done();
        }
      );
    });
  });

  describe("POST /lists/:listId/products/:id/destroy", () => {
    it("should delete the product with the associated ID", done => {
      expect(this.product.id).toBe(1);

      request.post(
        `${base}/${this.list.id}/products/${this.product.id}/destroy`,
        (err, res, body) => {
          Product.findById(1).then(product => {
            expect(err).toBeNull();
            expect(product).toBeNull();
            done();
          });
        }
      );
    });
  });

  describe("GET /lists/:listId/products/:id/edit", () => {
    it("should render a view with an edit product form", done => {
      request.get(
        `${base}/${this.list.id}/products/${this.product.id}/edit`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Product");
          done();
        }
      );
    });
  });

  describe("POST /lists/:listId/products/:id/update", () => {
    it("should return a status code 302", done => {
      request.post(
        {
          url: `${base}/${this.list.id}/products/${this.product.id}/update`,
          form: {
            name: "Lemon",
            purchased: false
          }
        },
        (err, res, body) => {
          expect(res.statusCode).toBe(302);
          done();
        }
      );
    });

    it("should update the product with the given values", done => {
      const options = {
        url: `${base}/${this.list.id}/products/${this.product.id}/update`,
        form: {
          name: "Lemon",
          purchased: false
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();

        Product.findOne({
          where: { id: this.product.id }
        }).then(product => {
          expect(product.name).toBe("Lemon");
          done();
        });
      });
    });
  });
});
