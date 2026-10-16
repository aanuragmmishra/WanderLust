const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const passport = require("passport");
const{saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");
const user = require("../models/user.js");


router.route("/signup")
    .get(userController.renderSignupFrom)
    .post(wrapAsync(userController.signup));


router.route("/login")
    .get(userController.renderLoginPage)
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true,}) , userController.login);


router.get("/login", userController.renderLoginPage);

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true,}) , userController.login);

router.get("/logout", userController.logout);

module.exports = router;