const express = require('express');
const router = express.Router();
const controller = require('../controller/store_controller');

router.get('/items', controller.getItems);
router.post('/items', controller.addItem);
router.patch('/items', controller.updateItem);
router.delete('/items', controller.deleteItem);
module.exports = router;