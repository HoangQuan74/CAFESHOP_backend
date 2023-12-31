import express from 'express';
import { auth } from '../../common/middleware';
const router = express.Router();

const userController = require('./controllers/userController')

// customers
router.get('/customers', auth, userController.getCustomers);

// products
router.post('/itemtypes', auth, userController.saveItemType);
router.put('/itemtypes/:id', auth, userController.updateItemType);
router.get('/itemtypes', auth, userController.getItemType);

router.post('/itemtypes/:id/items', auth, userController.saveItems);
router.put('/itemtypes/:id/items/:iid', auth, userController.saveItems);
router.get('/itemtypes/:id/items', auth, userController.getItems);
router.get('/items', auth, userController.getItems);
router.delete('/itemtypes/:id/items/iid', auth, userController.deleteItem);

module.exports = router;