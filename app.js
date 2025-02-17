const express = require('express')
const cors = require('cors')
const app = express()
const storeItemRoutes = require('./routes/store_items_routes')
app.use(cors())
app.use(express.json())
app.use('/api/store', storeItemRoutes)

module.exports = app;