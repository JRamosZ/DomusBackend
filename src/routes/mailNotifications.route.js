const express = require("express");
const router = express.Router();
const { sendEmail } = require("../usecases/mailNotifications.usecase");

router.post("/:id", async (req, res) => {
  try {
    const mailSent = await sendEmail(req.params.id);
    res.status(201);
    res.json({
      success: true,
      data: mailSent,
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
