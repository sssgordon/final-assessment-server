const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Event = require("../events/model");
const Ticket = require("../tickets/model");
const Comment = require("../comments/model");

Ticket.belongsTo(User);
User.hasMany(Ticket);

Comment.belongsTo(User);
User.hasMany(Comment);

Ticket.belongsTo(Event);
Event.hasMany(Ticket);

Comment.belongsTo(Ticket);
Ticket.hasMany(Comment);

module.exports = User;
