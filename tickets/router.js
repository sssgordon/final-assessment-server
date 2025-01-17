const { Router } = require("express");
const Ticket = require("./model");
const Comment = require("../comments/model");
const User = require("../users/model");
const Event = require("../events/model");
const { toData } = require("../auth/jwt");
const auth = require("../auth/middleware");

const router = new Router();

router.post("/tickets", auth, async (request, response, next) => {
  try {
    const userId = toData(request.body.jwt).userId;

    const ticket = {
      imageUrl: request.body.imageUrl,
      price: request.body.price,
      description: request.body.description,
      userId: userId,
      eventId: request.body.eventId
    };

    const author = await User.findByPk(userId);

    const newTicket = await Ticket.create(ticket);
    response.send({ ticket: newTicket, author: author.dataValues.username });
  } catch (error) {
    next(error);
  }
});

router.get("/tickets", async (request, response, next) => {
  try {
    const tickets = await Ticket.findAll({
      order: [["id", "DESC"]],
      include: [{ model: User }, { model: Comment }]
    });
    response.send(tickets);
  } catch (error) {
    next(error);
  }
});

// get all tickets of one event
router.get("/events/:eventId/tickets", async (request, response, next) => {
  try {
    // console.log("DATE TEST", Date.now());
    const tickets = await Ticket.findAll({
      where: { eventId: request.params.eventId },
      order: [["id", "DESC"]],
      include: [User, Comment]
    });
    response.send(tickets);
  } catch (error) {
    next(error);
  }
});

// get all tickets of a user
router.get("/user/tickets/:ticketId", async (request, response, next) => {
  try {
    const ticket = await Ticket.findByPk(request.params.ticketId);
    const tickets = await Ticket.findAll({ where: { userId: ticket.userId } });
    response.send(tickets);
  } catch (error) {
    next(error);
  }
});

router.put("/edit/tickets/:ticketId", auth, async (request, response, next) => {
  try {
    const ticket = await Ticket.findByPk(request.params.ticketId); // may change to findOne
    if (ticket) {
      ticket.update(request.body);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/tickets/:id", async (request, response, next) => {
  try {
    const ticket = await Ticket.findByPk(request.params.id, {
      include: [Comment]
    }); // may change to findOne
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
