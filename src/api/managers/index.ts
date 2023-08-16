import express from 'express';
const auth = require('../../common/middleware');
const router = express.Router();

const userController = require('./controllers/userController')

// customers
router.get('/customers', auth, userController.getCustomers);

module.exports = router;