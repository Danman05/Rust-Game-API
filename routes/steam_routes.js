const express = require('express');
const router = express.Router();
const controller = require('../controller/steam_controller');

router.get('/', controller.authenticate);
router.get('/return', controller.returnCallback);
router.get('/user', controller.userData);
router.get('/logout', controller.logout);

module.exports = router;