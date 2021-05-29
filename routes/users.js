var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/confirm', authController.confirm);
router.get('/', authController.users);

module.exports = router;
