const { Router } = require("express");
const Event = require("./model");
const Ticket = require("../tickets/model");
const Sequelize = require("sequelize");

const router = new Router();

router.post("/events", async (request, response, next) => {
  try {
    const event = {
      name: request.body.name,
      description: request.body.description,
      imageUrl: request.body.imageUrl,
      date: request.body.date
    };

    const newEvent = await Event.create(event);
    response.send(newEvent);
  } catch (error) {
    next(error);
  }
});

router.get("/events", async (request, response, next) => {
  try {
    // console.log("DATE TEST", Date.now());
    const events = await Event.findAll(
      { where: { date: { [Sequelize.Op.gte]: Date.now() } } }, // this returns only the dates gte today
      { include: [Ticket] }
    );
    response.send(events);
  } catch (error) {
    next(error);
  }
});

router.put("/events/:id", async (request, response, next) => {
  try {
    const event = await Event.findByPk(request.params.id, {
      include: [Ticket]
    }); // may change to findOne
    if (event) {
      const updatedEvent = await event.update(request.body);
      response.send(updatedEvent);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/events/:id", async (request, response, next) => {
  try {
    const event = await Event.findByPk(request.params.id, {
      include: [Ticket]
    }); // may change to findOne
    if (event) {
      await event.destroy();
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
