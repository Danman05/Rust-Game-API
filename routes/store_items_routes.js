const express = require('express')
const router = express.Router()
const controller = require('../controller/store_controller')

router.get('/items', controller.getItems)
router.post('/items', controller.addItem)
module.exports = router