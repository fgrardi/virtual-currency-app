const passport = require('passport');
const User = require('../models/User');

passport.use(User.createStrategy()); //configuratie passport

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());