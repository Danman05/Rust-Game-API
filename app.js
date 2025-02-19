const express = require('express');
const app = express();
const session = require('express-session')
const cors = require('cors');

const storeItemRoutes = require('./routes/store_items_routes');
const steamAuthRoutes = require('./routes/steam_routes');

const passport = require('passport');

require('dotenv').config()

app.use(cors({
    origin: ["http://localhost:4200",], // Angular URL
    credentials: true,
}));

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/store', storeItemRoutes);
app.use('/api/auth', steamAuthRoutes );



module.exports = app;