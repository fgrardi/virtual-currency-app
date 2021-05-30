const Transaction = require('../../../models/Transactions');
const jwt = require('jsonwebtoken');
const config = require('config');

const createNewTransaction = async (req, res) => {
    const decodedToken = extractAndVerify(req);
    if (decodedToken.status !== "success") {
        return res.json(decodedToken);
    }
    const amount = req.body.amount;
    const username = req.body.username;
    const recipient = req.body.recipient;
    const reason = req.body.reason;
    const remark = req.body.remark;

    if (username !== decodedToken.decoded.username) {
        return res.json({
            "status": "error",
            "message": "User inside token does not match transaction!"
        })
    }

    let balance = await getBalanceForUsername(username);
    // console.log("balance of user", balance)
    if (balance >= amount) {
        const transaction = new Transaction({
            amount,
            username,
            recipient,
            reason,
            remark
        });
        
        transaction.save().then(async () => {
            let leaderboard = await createLeaderboard();
            sendTransactionToPrimus(transaction, leaderboard);
            res.json({
                "status": "success"
            });
        }).catch(error => {
            res.json({
                "status": "error",
                "message": error
            })
        });    
    } else {
        res.json({
            "status": "error",
            "message": "Not enough coins (" + balance + ")"
        })
    }
    
};

function sendTransactionToPrimus(transaction, leaderboard) {
    primus.forEach(function (spark, id, connections) {
        const decoded = decodeToken(spark.query.token);
        const status = decoded.status;
        if (decoded.status === "success") {
            if ((decoded.decoded.username === transaction.username) ||
                (decoded.decoded.username === transaction.recipient)) {
                    spark.write({ transaction });
            }
        }
    });
    primus.write({ leaderboard } );
}

const getTransactions = (req, res) => {
    const decodedToken = extractAndVerify(req);
    if (decodedToken.status !== "success") {
        res.json(decodedToken);
    }

    const username = decodedToken.decoded.username;

    Transaction.find({$or:[{username: username},{recipient: username}]}, (err, docs) => {
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
            if (transaction.username !== username) {
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

const getBalance = (req, res) => {
    const decodedToken = extractAndVerify(req);
    if (decodedToken.status !== "success") {
        res.json(decodedToken);
    }
    const username = decodedToken.decoded.username;
    const balanceResult = getBalanceForUsername(username);
    balanceResult
        .then(balance => res.json({ 
                                "status": "success",
                                "data": {
                                    "balance": balance
                                }
                            }))
        .catch(error => res.json({
                                "status": "error",
                                "message": error
                            }));

};

async function getBalanceForUsername(username) {
    let transactions = await Transaction.find({$or:[{username: username},{recipient: username}]});

    // console.log("all:", transactions)
    let balance = 0;
    transactions.forEach(transaction => {
        // console.log("single:", transaction)
        if (transaction.recipient === username) {
            balance += transaction.amount;
        } else {
            balance -= transaction.amount;
        }
    }); 
    return balance;
}

const getLeaderboard = (req, res) => {
    let leaderboard = createLeaderboard();
    leaderboard.then(leaderboard => {
        res.json({
            "status": "success",
            "leaderboard": leaderboard
        });
    })
    .catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    })
}

const createBaseTransaction = (username, amount) => {
    const transaction = new Transaction({
        amount: amount,
        username: username,
        recipient: username,
        reason: "Start amount",
        remark: "Initial free amount"
    });    
    transaction.save().then(async () => {
        return {
            "status": "success"
        };
    }).catch(error => {
        return {
            "status": "error",
            "message": error
        };
    });
}

async function createLeaderboard() {
    leaderboard = {};
    let allDocs = await Transaction.find();

    allDocs.forEach(doc => {
        let recipientTotal = leaderboard[doc.recipient];
        if (!recipientTotal) {
            leaderboard[doc.recipient] = doc.amount;
        } else {
            leaderboard[doc.recipient] = recipientTotal + doc.amount;
        }
        if (doc.username !== doc.recipient) {
            let usernameTotal = leaderboard[doc.username];
            if (usernameTotal) {
                leaderboard[doc.username] = usernameTotal - doc.amount;
            }
        }
    })

    // sort array
    leaderboard = Object.entries(leaderboard).sort((a, b) => {
        let amount1 = a[1].amount;
        let amount2 = b[1].amount;
        if (amount1 > amount2) return -1
        else if ((amount1 < amount2)) return 1
        else return 0
    }).map(element => { return { "username": element[0], "amount": element[1] } } );

    return leaderboard;
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
module.exports.getBalance = getBalance;
module.exports.createBaseTransaction = createBaseTransaction;