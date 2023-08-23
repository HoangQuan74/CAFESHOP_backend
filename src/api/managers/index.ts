import express from 'express';
import { auth } from '../../common/middleware';
const router = express.Router();

const userController = require('./controllers/userController')

// customers
router.get('/customers', auth, userController.getCustomers);

// products
router.post('/itemtypes', auth, userController.saveItemType);
router.get('/itemtypes', auth, userController.getItemType);

module.exports = router;