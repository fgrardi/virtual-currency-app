const express = require('express');
const router = express.Router();
const transfersController = require('../../../controllers/api/v1/transfers');

// /api/v1/transfers
router.post("/", transfersController.createNewTransaction);
router.get("/", transfersController.getTransactions);
router.get("/:id", transfersController.getTransactionById);

module.exports = router;