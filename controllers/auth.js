const User = require('../models/User');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');
const config = require('config');

const signup = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    const user = new User({
        username: username,
        password: password,
        email: email,
        confirmationCode: createToken(email)
    });
    await user.setPassword(password);
    await user.save().then(result => {
        res.json({
            "status": "success"
        })
    }).catch(error => {
        res.json({
            "status": "error [" + error + "]"
        })
    });
};

const login = async (req, res, next) => {
    const user = await User.find(
        {
            username: req.body.username,
            password: req.body.password
        }
    ).then(result => {
        if (result[0].status !== "Active") {
            res.json({
                "status": "error",
                "message": "Pending Account. Please Verify Your Email!"
            })
        } else {
            res.json({
                "status": "success",
                "data": {
                    "token": createToken(result.username)
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

function createToken(username) {
    console.log("Token: ", config.get("jwt.secret"));

    return jwt.sign({username: username},
        config.get("jwt.secret"),
        { 
            expiresIn: '24h' // expires in 24 hours
        }
      );
}

module.exports.signup = signup;
module.exports.login = login;