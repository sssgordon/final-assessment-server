const { Router } = require("express");
const Event = require("./model");
const Ticket = require("../tickets/model");
const User = require("../users/model");
const Comment = require("../comments/model");
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

// get all events
router.get("/events", async (request, response, next) => {
  try {
    // console.log("DATE TEST", Date.now());
    const events = await Event.findAll(
      {
        where: { date: { [Sequelize.Op.gte]: Date.now() } },
        order: [["id", "DESC"]],
        include: [
          { model: Ticket, include: [{ model: User }, { model: Comment }] }
        ]
      } // this returns only the dates gte today
    );
    response.send(events);
  } catch (error) {
    next(error);
  }
});

//pagination
// router.get()

// get all tickets of one event
router.get("/events/:eventId/tickets", async (request, response, next) => {
  try {
    // console.log("DATE TEST", Date.now());
    const event = await Event.findOne(
      { where: { id: request.params.eventId }, include: [Ticket] } // this returns only the dates gte today
    );
    response.send(event.tickets);
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
