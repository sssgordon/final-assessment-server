const { Router } = require("express");
const Ticket = require("./model");

const router = new Router();

router.post("/tickets", async (request, response, next) => {
  try {
    const ticket = {
      imageUrl: request.body.imageUrl,
      price: request.body.price,
      description: request.body.description
    };

    const newTicket = await Ticket.create(ticket);
    response.send(newTicket);
  } catch (error) {
    next(error);
  }
});

router.get("/tickets", async (request, response, next) => {
  try {
    const tickets = await Ticket.findAll();
    response.send(tickets);
  } catch (error) {
    next(error);
  }
});

router.put("/tickets/:id", async (request, response, next) => {
  try {
    const ticket = await Ticket.findByPk(request.params.id); // may change to findOne
    if (ticket) {
      const updatedTicket = await ticket.update(request.body);
      response.send(updatedTicket);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/tickets/:id", async (request, response, next) => {
  try {
    const ticket = await Ticket.findByPk(request.params.id); // may change to findOne
    if (ticket) {
      await ticket.destroy();
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
