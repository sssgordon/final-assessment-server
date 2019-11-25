const { Router } = require("express");
const Event = require("./model");

const router = new Router();

router.post("/event", async (request, response, next) => {
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

router.get("/event", async (request, response, next) => {
  try {
    const events = await Event.findAll();
    response.send(events);
  } catch (error) {
    next(error);
  }
});

router.put("/event/:id", async (request, response, next) => {
  try {
    const event = await Event.findByPk(request.params.id);
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

router.delete("/event/:id", async (request, response, next) => {
  try {
    const event = await Event.findByPk(request.params.id);
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
