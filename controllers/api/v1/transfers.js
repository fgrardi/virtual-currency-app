const createNewTransaction = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "transfer": {"transaction": "Add coins to database"}
        } 
    })
};

const getTransactions = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "transfers": [] //empty array of transfers
        }
    })
};

const getTransactionById = (req, res) => {
    res.json({
        "status": "success",
        "data": "data of one transfer"
    })
};

module.exports.createNewTransaction = createNewTransaction;
module.exports.getTransactions = getTransactions;
module.exports.getTransactionById = getTransactionById;