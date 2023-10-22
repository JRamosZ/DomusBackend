const express = require("express");

const router = express.Router();
const {
  createComments,
  getById,
  listComments,
} = require("../usecases/comment.usecase");

//list comments
router.get("/", async (req, res) => {
  try {
    const listComment = await listComments();
    res.json({
      success: true,
      data: listComment,
    });
  } catch (error) {
    res.status(400);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//consultation id
router.get("/:id", async (req, res) => {
  try {
    const comment = await getById(req.params.id);
    if (!comment) {
      const error = new Error("Comment not found");
      error.status = 404;
      throw error;
    }
    res.json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//create comments
router.post("/", async (req, res) => {
  try {
    const comments = await createComments(req.body);
    res.status(201);
    res.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
