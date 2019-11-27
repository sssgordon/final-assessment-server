const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const Ticket = require("../tickets/model");
const Comment = require("../comments/model");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.post("/users", async (request, response, next) => {
  const user = {
    username: request.body.username,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 10)
  };

  const newUser = await User.create(user).catch(err => next(err));
  response.send({
    jwt: toJWT({ userId: newUser.id }),
    username: newUser.username
  });
});

router.get("/users", async (request, response, next) => {
  try {
    const users = await User.findAll({
      order: [["id", "DESC"]]
    });
    response.send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id", async (request, response, next) => {
  try {
    const user = await User.findByPk(request.params.id, {
      include: [Ticket, Comment]
    }); // may change to findOne
    if (user) {
      response.send(user);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
