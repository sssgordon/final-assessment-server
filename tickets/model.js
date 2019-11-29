const Sequelize = require("sequelize");
const db = require("../db");

const Ticket = db.define("ticket", {
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  risk: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Ticket;
