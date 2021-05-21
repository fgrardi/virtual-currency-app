const User = require('../models/User');
const passport = require('../passport/passport');

const signup = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    const user = new User({
        username: username,
        password: password,
        email: email
    });
    await user.setPassword(password);
    await user.save().then(result => {
        res.json({
            "status": "success"
        })
    }).catch(error => {
        res.json({
            "status": "error"
        })
    });
};

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        res.json({
            "status": "success",
            "data": {
                "user": result
            }
        })
    }).catch( error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
}

module.exports.signup = signup;
module.exports.login = login;