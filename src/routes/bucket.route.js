const express = require("express");
const multer = require("multer");

const {
  saveUpload,
  getPicture,
  saveUploadOne,
} = require("../usecases/bucket.usecase");

const router = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Middleware

// Upload an array of files
router.post("/upload", upload.any(), async (req, res) => {
  try {
    const upload = await saveUpload(req.body, req.files);
    res.status(201);
    res.json({
      success: true,
      data: upload,
    });
  } catch (err) {
    res.status(400);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

// Upload a unique file
router.post("/uploadOne", upload.any(), async (req, res) => {
  console.log("body", req.body);
  console.log("files", req.files);
  try {
    const upload = await saveUploadOne(req.body, req.files[0]);
    res.status(201);
    res.json({
      success: true,
      data: upload,
    });
  } catch (err) {
    res.status(400);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

// Download a unique file
router.get("/download/:id(*)", async (req, res) => {
  try {
    const urlAccess = await getPicture(req.params.id);
    res.json({
      success: true,
      data: urlAccess,
    });
  } catch (err) {
    res.status(400);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
