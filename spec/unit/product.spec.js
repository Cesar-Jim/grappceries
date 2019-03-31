const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Product = require("../../src/db/models").Product;

describe("Product", () => {
  beforeEach(done => {
    this.list;
    this.product;
    sequelize.sync({ force: true }).then(res => {
      List.create({
        name: "Friends List"
      })
        .then(list => {
          this.list = list;

          Product.create({
            name: "Apples",
            purchased: false,
            listId: this.list.id
          }).then(product => {
            this.product = product;
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("#create()", () => {
    it("should create a product object with a name, purchase status, and assigned list", done => {
      Product.create({
        name: "Apples",
        purchased: false,
        listId: this.list.id
      })
        .then(product => {
          expect(product.name).toBe("Apples");
          expect(product.purchased).toBe(false);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("should not create a product with missing name, purchased status, or assigned list", done => {
      Product.create({
        name: "Apples"
      })
        .then(product => {
          done();
        })
        .catch(err => {
          expect(err.message).toContain("Product.purchased cannot be null");
          expect(err.message).toContain("Product.listId cannot be null");
          done();
        });
    });
  });

  describe("#setList()", () => {
    it("should associate a list and a product together", done => {
      List.create({
        name: "Party List"
      }).then(newList => {
        expect(this.product.listId).toBe(this.list.id);

        this.product.setList(newList).then(product => {
          expect(product.listId).toBe(newList.id);
          done();
        });
      });
    });
  });
});
