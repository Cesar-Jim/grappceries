"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      purchased: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      listId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Product.associate = function(models) {
    Product.belongsTo(models.List, {
      foreignKey: "listId",
      onDelete: "CASCADE"
    });
  };
  return Product;
};
