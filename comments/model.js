const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = Comment;
