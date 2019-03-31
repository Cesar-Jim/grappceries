"use strict";
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    "List",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  List.associate = function(models) {
    List.hasMany(models.Product, {
      foreignKey: "listId",
      as: "products"
    });
  };
  return List;
};
