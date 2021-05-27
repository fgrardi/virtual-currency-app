const Transaction = require('../../../models/Transactions');
const jwt = require('jsonwebtoken');
const config = require('config');

const createNewTransaction = (req, res) => {
    let transaction = new Transaction();

    transaction.text = req.body.text;
    transaction.amount = req.body.amount;
    transaction.user = req.body.user;
    transaction.recipient = req.body.recipient;
    transaction.reason = req.body.reason;
    transaction.completed = req.body.completed;
    
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
    const decodedToken = extractAndVerify(req);
    if (decodedToken.status !== "success") {
        res.json(decodedToken);
    }

    const username = decodedToken.decoded.username;

    Transaction.find({$or:[{user: username},{recipient: username}]}, (err, docs) => {
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
                "message": "couldn't save this transaction",
                "message": error
            })
        }
    })
};

const getTransactionById = (req, res) => {
    const decodedToken = extractAndVerify(req);
    if (decodedToken.status !== "success") {
        return res.json(decodedToken);
    }
    const id = req.params.id;
    const username = decodedToken.decoded.username;
    Transaction.findOne({_id: id}, (error, transaction) => {
        if (error) {
            res.json({
                "status": "error",
                "message": error
            })
        }
        else {
            if (transaction.user !== username) {
                res.json({
                    "status": "error",
                    "message": "Transaction not of user of token"
                })
                } else {
                res.json({
                    "status": "success",
                    "transaction": transaction
                })
            }
        }
    });
};

const getLeaderboard = (req, res) => {
    res.json({
        "status": "succes",
        "message": "GETTING coins of user"
    })
}

function extractAndVerify(req) {
    const extractResult = extractToken(req);
    if (extractResult.status !== "success") {
        return extractResult;
    }
    return decodeToken(extractResult.token);
}

function extractToken(req) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; 
    if (!token) {
        return {
            "status": "error",
            "message": "No token available!"
        };
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    return { 
        "status": "success", 
        token 
    };
}

function decodeToken(token) {
    return jwt.verify(token, config.get("jwt.secret"), (err, decoded) => {
            if (err) {
          return {
            status: "error",
            message: 'Token is not valid'
          };
        } else {
            return {
                status: "success",
                decoded: decoded
            }
        }
    });
}

module.exports.createNewTransaction = createNewTransaction;
module.exports.getTransactions = getTransactions;
module.exports.getTransactionById = getTransactionById;
module.exports.getLeaderboard = getLeaderboard;