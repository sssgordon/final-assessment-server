const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/users", async (request, response, next) => {
  const user = {
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 10)
  };

  const newUser = await User.create(user).catch(err => next(err));
  response.send(newUser);
});

router.get("/users/:id", async (request, response, next) => {
  try {
    const user = await User.findByPk(request.params.id); // may change to findOne
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
