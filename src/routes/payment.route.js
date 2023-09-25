const express = require("express");
const router = express.Router();
const { paymentProcess } = require("../usecases/payment.usecase");

router.post("/", async (req, res) => {
    try {
        const paymentIntent = await paymentProcess(req.body);
        res.status(200)
        res.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (err) {
        res.status(500);
        res.json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;