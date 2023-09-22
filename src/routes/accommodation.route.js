const express = require("express");

const router = express.Router();
const {
  createAccommodation,
  getById,
  listAccommodation,
  updateAccommodation,
  deleteAccommodation,
} = require("../usecases/accommodation.usecase");

//list accommodation
router.get("/", async (req, res) => {
  try {
    const accommodation = await listAccommodation();
    res.json({
      success: true,
      data: accommodation,
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

//create accommodation
router.post("/", async (req, res) => {
  try {
    const accommodation = await createAccommodation(req.body);
    res.status(201);
    res.json({
      success: true,
      data: accommodation,
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//update accommodation
router.patch("/:id", async (req, res) => {
  try {
    const upAccommodation = await updateAccommodation(req.params.id, req.body);

    res.json({
      success: true,
      data: upAccommodation,
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//delete accommodation
router.delete("/:id", async (req, res) => {
  try {
    const accommodation = await deleteAccommodation(req.params.id);

    res.json({
      success: true,
      data: accommodation,
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
