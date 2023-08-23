import express from 'express';
const router = express.Router();

const userController = require('./controllers/userController')

router.post('/auth/login', userController.login);
router.put('/auth/logout', userController.logout);
router.post('/auth/signup', userController.signup);

module.exports = router;