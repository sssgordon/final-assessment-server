const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/user", async (request, response, next) => {
  const user = {
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 10)
  };

  const newUser = await User.create(user).catch(err => next(err));
  response.send(newUser);
});

module.exports = router;
