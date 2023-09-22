const express = require("express");
const router = express.Router();
const { getById, create, update } = require("../usecases/pet.usecase");
const { auth } = require("../middlewares/auth.middleware");

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
        const newPet = await update(req.params.id, req.body, )

    }
});

module.exports = router;
