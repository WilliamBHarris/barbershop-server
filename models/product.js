const { DataTypes } = require("sequelize");
const db = require("../db");

const ProductModel = db.define("product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  // image: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  // title: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  // description: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  // category: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  // price: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  // },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

module.exports = ProductModel;
