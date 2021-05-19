const Transaction = require('../../../models/Transactions')

const createNewTransaction = (req, res) => {
    let transaction = new Transaction();

    transaction.text = "message";
    transaction.amount = 40;
    transaction.user = "fgrardi";
    transaction.recipient = "jgrardi";
    transaction.reason = "dev help";
    transaction.completed = false;
    transaction.save((err, doc) => {
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "transaction" : doc
                }
            })
        }
    })
};

const getTransactions = (req, res) => {
    Transaction.find({"user": "fgrardi"}, (err, docs) => {
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "transactions": docs
                }
            })
        }
        else {
            res.json({
                "status": "error",
                "message": "couldn't load transactions"
            })
        }
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