const express = require("express");
const { create, getById, update } = require("../usecases/review.usecase");
const { auth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const review = await create(req.body);
    res.json({
      success: true,
      data: review,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const review = await getById(req.params.id);
    res.json({
      success: true,
      data: review,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const newReview = await update(req.params.id, req.body);
    res.json({
      success: true,
      data: newReview,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
