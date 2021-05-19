const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/api/v1/transfers');

// /api/v1/transfers
router.post("/", controller.createNewTransaction);
router.get("/", controller.getTransactions);
router.get("/:id", controller.getTransactionById);

module.exports = router;