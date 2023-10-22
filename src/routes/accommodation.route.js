const express = require("express");

const router = express.Router();
const {
  createAccommodation,
  createAccommodationId,
  getById,
  listAccommodation,
  updateAccommodation,
  deleteAccommodation,
} = require("../usecases/accommodation.usecase");

const userCases = require("../usecases/user.usecase");

// Middleware
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//list accommodation
router.get("/", async (req, res) => {
  try {
    const accommodation = await listAccommodation(req.query);
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
    const updatedUser = await userCases.update(accommodation.owner, {
      accommodation: accommodation._id,
    });
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

//create accommodation with Id
router.post("/:id", upload.any(), async (req, res) => {
  const data = JSON.stringify(req.body.data);
  console.log("body", req.body);
  console.log("files", req.files);
  // const data = JSON.parse(req.body.data);
  try {
    // const accommodation = await createAccommodationId(req.params.id, data, req.body.folder, req.files);
    res.status(201);
    res.json({
      success: true,
      // data: accommodation,
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
    const upAccommodation = await updateAccommodation(
      req.params.id,
      req.body,
      req.headers.authorization
    );

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
