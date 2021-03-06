const User = require('../models/User');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');
const config = require('config');
const nodemailer = require('../mailer/nodemailer.config');
const transactions = require('./api/v1/transaction');

const signup = async (req, res, next) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    // get host name
    let hostname = req.get('host');

    const user = new User({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        email: email,
        confirmationCode: createToken({email: email})
    });
    await user.setPassword(password);
    await user.save().then(async (result) => {
        await nodemailer.sendConfirmationEmail(user.username, user.firstname, user.lastname, user.email, user.confirmationCode, hostname);
        res.json({
            "status": "success"
        })
    }).catch(error => {
        res.json({
            "status": "error [" + error + "]"
        })
    });
};

const confirm = async (req, res) => {
    await User.findOne({ confirmationCode: req.query.code, status: "Pending" })
        .then(found => { 
            if (!found) {
                return res.json({
                    "status": "error",
                    "message": 'User not found or already Active'
                });
            }
            jwt.verify(req.query.code, config.get("jwt.secret"), async (err, decoded) => {
                if (err) {
                  return res.json({
                    "status": "error",
                    "message": 'Token is not valid'
                  });
                } else {
                    if (decoded.email !== found.email) {
                        return res.json({
                            "status": "error",
                            "message": 'Token does not match user'
                        });
                    };
                }
                User.findOneAndUpdate({ confirmationCode: req.query.code }, {status: "Active"}, null, () => {
                    transactions.createBaseTransaction(found.username, 100);
                    res.json({
                        "status": "success" 
                    });
                });
            });
        })
        .catch(error => {
            res.json({
                "status": "error",
                "message": error
            })
        });

}

const login = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    const user = await User.find({username, password}).then(result => {
        if (result[0].status !== "Active") {
            res.json({
                "status": "error",
                "message": "Pending Account. Please Verify Your Email!",
                "confirmationCode": result[0].confirmationCode
            })
        } else {
            res.json({
                "status": "success",
                "data": {
                    "token": createToken({username: result[0].username})
                }
            })
        }
    }).catch( error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
}

const users = async (req,res) => {
    await User.find({status: "Active"})
        .then(users => {
            let userInfo = []
            users.forEach(user => {
                userInfo.push({ username: user.username, firstname: user.firstname, lastname: user.lastname });
            });
            return userInfo;
        })
        .then(filteredUsers => {
            res.json({
                "status": "success",
                "users": filteredUsers
            });
        })
        .catch(error => {
            res.json({
                "status": "error",
                "message": error
            })
        });
}

//create token
function createToken(data) {
    console.log("Token: ", config.get("jwt.secret")); //show token in console log

    return jwt.sign(data,
        config.get("jwt.secret"),
        { 
            expiresIn: '24h' // expires in 24 hours
        }
      );
}

module.exports.signup = signup;
module.exports.confirm = confirm;
module.exports.login = login;
module.exports.users = users;