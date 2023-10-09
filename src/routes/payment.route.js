const express = require("express");
const router = express.Router();
const { paymentProcess, paymentStatus } = require("../usecases/payment.usecase");

router.post("/create-payment-intent", async (req, res) => {
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

router.post('/webhook', async (req, res) => {
    try {
        await paymentStatus(req.body);
        res.status(200)
        res.json(
            {received: true}
        );
    } catch (err) {
        res.status(500);
        res.json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;