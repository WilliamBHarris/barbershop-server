const { DataTypes } = require("sequelize");
const db = require("../db");

const Reviews = db.define("review", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  time: {
    type: DataTypes.ARRAY(DataTypes.TIME),
    allowNull: true,
  },
  // userName: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
});

module.exports = Reviews;
