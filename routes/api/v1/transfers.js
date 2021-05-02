const express = require('express');
const router = express.Router();

// /api/v1/transfers
router.post("/", (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "transfer": {"transaction": "Add coins to database"}
        } 
    })
});

router.get("/", (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "transfers": [] //empty array of transfers
        }
    })
});

router.get("/:id", (req, res) => {
    res.json({
        "status": "success",
        "data": "data of one transfer"
    })
});