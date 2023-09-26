const express = require("express");
const router = express.Router();
const {
  list,
  getById,
  create,
  update,
  deleteById,
} = require("../usecases/pet.usecase");
const { auth } = require("../middlewares/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const petList = await list(req.query);
    res.json({
      success: true,
      data: petList,
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
    const pet = await getById(req.params.id);
    res.json({
      success: true,
      data: pet,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const pet = await create(req.body);
    res.status(201);
    res.json({
      success: true,
      data: pet,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const newPet = await update(
      req.params.id,
      req.body,
      req.headers.authorization
    );
    res.json({
      success: true,
      data: newPet,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPet = await deleteById(
      req.params.id,
      req.headers.authorization
    );
    res.json({
      success: true,
      data: deletedPet,
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
