const List = require("./models").List;
const Product = require("./models").Product;

module.exports = {
  getAllLists(callback) {
    return List.all()

      .then(lists => {
        callback(null, lists);
      })
      .catch(err => {
        callback(err);
      });
  },

  addList(newList, callback) {
    return List.create({
      name: newList.name
    })
      .then(list => {
        callback(null, list);
      })
      .catch(err => {
        callback(err);
      });
  },

  getList(id, callback) {
    return List.findById(id, {
      include: [
        {
          model: Product,
          as: "products"
        }
      ]
    })
      .then(list => {
        callback(null, list);
      })
      .catch(err => {
        callback(err);
      });
  },

  deleteList(id, callback) {
    return List.destroy({
      where: { id }
    })
      .then(list => {
        callback(null, list);
      })
      .catch(err => {
        callback(err);
      });
  },

  updateList(id, updatedList, callback) {
    return List.findById(id).then(list => {
      if (!list) {
        return callback("List not found");
      }

      list
        .update(updatedList, {
          fields: Object.keys(updatedList)
        })
        .then(() => {
          callback(null, list);
        })
        .catch(err => {
          callback(err);
        });
    });
  }
};
