const express = require('express')
const cors = require('cors')
const app = express()
const storeItemRoutes = require('./routes/store_items_routes')
app.use(cors())
app.use('/api/store', storeItemRoutes)

app.get('/base', (req, res) => {
    message = "Hello World";
    messageBase64 = btoa(message);
  res.send([messageBase64, atob(messageBase64)])
})

module.exports = app;