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

// router.put("/tickets/:id", async (request, response, next) => {
//   try {
//     const event = await Event.findByPk(request.params.id);
//     if (event) {
//       const updatedEvent = await event.update(request.body);
//       response.send(updatedEvent);
//     } else {
//       response.status(404).end();
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/tickets/:id", async (request, response, next) => {
//   try {
//     const event = await Event.findByPk(request.params.id);
//     if (event) {
//       await event.destroy();
//       response.status(204).end();
//     } else {
//       response.status(404).end();
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
