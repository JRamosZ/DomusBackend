const express = require("express");
const router = express.Router();
const { auth, userChange } = require("../middlewares/auth.middleware");
const {
  list,
  getById,
  create,
  update,
  deleteById,
} = require("../usecases/user.usecase");

router.get("/", async (req, res) => {
  try {
    const users = await list(req.query);
    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(400);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await getById(req.params.id);
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await create(req.body);
    res.status(201);
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.patch("/:id", userChange, async (req, res) => {
  try {
    const user = await update(
      req.params.id,
      req.body,
      req.headers.authorization
    );
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/:id", userChange, async (req, res) => {
  try {
    const user = await deleteById(req.params.id, req.headers.authorization);
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
