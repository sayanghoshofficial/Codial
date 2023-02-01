const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controllers');

router.get('/profile',usersController.profile);

router.get('/sign_up',usersController.signUp);
router.get('/sign_in',usersController.signIn);

router.post('/create',usersController.create);
router.post('/create-session',usersController.createSession);

module.exports = router;