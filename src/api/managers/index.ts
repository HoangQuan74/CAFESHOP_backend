import express from 'express';
const auth = require('../../common/middleware');
const router = express.Router();

const userController = require('./controllers/userController')

// customers
router.get('/customers', auth, userController.getCustomers);

// products
router.post('/itemtypes', auth, userController.saveItemType);

module.exports = router;