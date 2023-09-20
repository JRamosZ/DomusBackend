const express = require("express");
const router = express.Router();
const {
  list,
  getById,
  create,
  update,
  deleteById,
} = require("../usecases/user.usecase");

router.get("/", async (req, res) => {
  try {
    const users = await list();
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
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
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

router.patch("/:id", auth, async (req, res) => {
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

router.delete("/:id", auth, async (req, res) => {
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

router.module.exports = router;
