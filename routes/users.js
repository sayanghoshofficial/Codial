const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controllers');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
// router.get('/profile/:id',passport.checkAuthentication,usersController.profile);  //make the profile page accessible only when the user is signed in

router.get('/sign_up',usersController.signUp);
router.get('/sign_in',usersController.signIn);

router.post('/create',usersController.create);
// router.post('/create-session',usersController.createSession);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign_in'},
),usersController.createSession);

router.get('/sign_out',usersController.destroySession);

router.get('/auth/google', passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect: '/users/sign_in'}), usersController.createSession);

module.exports = router;