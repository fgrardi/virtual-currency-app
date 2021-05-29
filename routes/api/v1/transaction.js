const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/api/v1/transaction');

// /api/v1/
router.post("/transfers", controller.createNewTransaction);
router.get("/transfers", controller.getTransactions);
router.get("/transfers/:id", controller.getTransactionById);
router.get("/leaderboard", controller.getLeaderboard);
router.get("/balance", controller.getBalance);

module.exports = router;