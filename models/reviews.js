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
    type: DataTypes.STRING,
    allowNull: true,
  },
  booked: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Reviews;
