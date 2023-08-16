import express from 'express';
const router = express.Router();

const userController = require('./controllers/userController')

router.post('/auth/login', userController.login);
router.put('/auth/logout', userController.logout);


module.exports = router;