const { Router } = require("express");
const Comment = require("./model");

const router = new Router();

router.post("/comments", async (request, response, next) => {
  try {
    const comment = {
      content: request.body.content
    };

    const newComment = await Comment.create(comment);
    response.send(newComment);
  } catch (error) {
    next(error);
  }
});

router.get("/comments", async (request, response, next) => {
  try {
    const comments = await Comment.findAll();
    response.send(comments);
  } catch (error) {
    next(error);
  }
});

router.put("/comments/:id", async (request, response, next) => {
  try {
    const comment = await Comment.findByPk(request.params.id);
    if (comment) {
      const updatedComment = await comment.update(request.body);
      response.send(updatedComment);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/comments/:id", async (request, response, next) => {
  try {
    const comment = await Comment.findByPk(request.params.id);
    if (comment) {
      await comment.destroy();
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
