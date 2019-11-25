const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./user/router");
const eventRouter = require("./event/router");

const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonParser = bodyParser();
app.use(jsonParser);

app.use(userRouter);
app.use(eventRouter);

app.get("/", (req, res, next) => {
  res.send("hello world");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port :${port}!`));
