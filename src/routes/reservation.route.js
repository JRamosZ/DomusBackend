const express = require("express");
const router = express.Router();
const { create, list, getById, modifyStatus, uploadEvidence } = require("../usecases/reservation.usecase");
const { auth } = require("../middlewares/auth.middleware");

router.post("/", async (req, res) => {
    try {
        const reservation = await create(req.body);
        res.json({
            success: true,
            data: reservation,
        });
    } catch (err) {
        res.status(500);
        res.json({
            success: false,
            message: err.message,
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const reservations = await list();
        res.json({
            success: true,
            data: reservations,
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
        const reservation = await getById(req.params.id);
        res.json({
            success: true,
            data: reservation,
        });
        } catch (err) {
        res.status(500);
        res.json({
            success: false,
            message: err.message,
        });
    }
});

router.patch("/:id/status", auth, async (req, res) => {
    try {
        const reservation = await modifyStatus(
            req.params.id, 
            req.body);
        res.json({
            success: true,
            data: reservation,
        });
    } catch (err) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        });
    }
});

router.patch("/:id/evidence", auth, async (req, res) => {
    try {
        const reservation = await uploadEvidence(
            req.params.id, 
            req.body);
        res.json({
            success: true,
            data: reservation,
            
        });
    } catch (err) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;