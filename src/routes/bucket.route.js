const express = require("express");
const multer = require("multer");

const { saveUpload, getPicture } = require("../usecases/bucket.usecase");

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

// Download a unique file
router.get("/download", async (req, res) => {
  try {
    const urlAccess = await getPicture(req.body.id);
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
