const Transaction = require('../../../models/Transactions')

const createNewTransaction = (req, res) => {
    res.json({
        "status": "success",
        "message": "POSTING new transaction"
    })
};

const getTransactions = (req, res) => {
    res.json({
        "status": "success",
        "message": "GETTING all transactions of user"
    })
};

const getTransactionById = (req, res) => {
    let id = req.params.id;
    res.json({
        "status": "success",
        "message": `GETTING transaction with id ${id}`
    })
};

const getLeaderboard = (req, res) => {
    res.json({
        "status": "succes",
        "message": "GETTING coins of user"
    })
}

module.exports.createNewTransaction = createNewTransaction;
module.exports.getTransactions = getTransactions;
module.exports.getTransactionById = getTransactionById;
module.exports.getLeaderboard = getLeaderboard;