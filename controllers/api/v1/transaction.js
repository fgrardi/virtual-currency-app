const Transaction = require('../../../models/Transactions');
const jwt = require('jsonwebtoken');
const config = require('config');

const createNewTransaction = (req, res) => {
    const decodedToken = extractAndVerify(req);
    if (decodedToken.status !== "success") {
        return res.json(decodedToken);
    }
    const amount = req.body.amount;
    const user = req.body.user;
    const recipient = req.body.recipient;
    const reason = req.body.reason;
    const remark = req.body.remark;

    if (user !== decodedToken.decoded.username) {
        return res.json({
            "status": "error",
            "message": "User inside token does not match transaction!"
        })
    }

    const transaction = new Transaction({
        amount,
        user,
        recipient,
        reason,
        remark
    });
    
    transaction.save().then(async () => {
        res.json({
            "status": "success"
        });
        let leaderboard = await createLeaderboard();
        //primus.write({transaction: { user, recipient, amount }, leaderboard } );
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
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

const getBalance = (req, res) => {
    const decodedToken = extractAndVerify(req);
    if (decodedToken.status !== "success") {
        res.json(decodedToken);
    }
    const username = decodedToken.decoded.username;
    Transaction.find({$or:[{user: username},{recipient: username}]}, (err, docs) => {
        if (!err) {
            let balance = 0;
            docs.forEach(doc => {
                if (doc.recipient === username) {
                    balance += doc.amount;
                } else {
                    balance -= doc.amount;
                }
            });
            res.json({
                "status": "success",
                "data": {
                    "balance": balance
                }
            })
        }
        else {
            res.json({
                "status": "error",
                "message": "couldn't calculate balance",
                "message": error
            })
        }
    })
};

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

async function createLeaderboard() {
    leaderboard = {};
    let allDocs = await Transaction.find();
    allDocs.forEach(doc => {
        let el = leaderboard[doc.recipient];
        if (!el) {
            leaderboard[doc.recipient] = doc.amount;
        } else {
            leaderboard[doc.recipient] = el + doc.amount;
        }
    })

    // sort array
    leaderboard = Object.entries(leaderboard).sort((a, b) => {
        if (a[0] < b[0]) return -1
        else if ((a[0] > b[0])) return 1
        else return 0
    }).map(element => { return { "name": element[0], "amount": element[1] } } );

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