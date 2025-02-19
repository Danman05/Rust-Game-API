var passport = require('passport');
const SteamStrategy = require('passport-steam');
require('dotenv').config();

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/api/auth/return',
    realm: 'http://localhost:3000/',
    apiKey: process.env.STEAM_SECRET
},
    function (identifier, profile, done) {
        process.nextTick(function () {
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));

exports.authenticate = passport.authenticate('steam')

exports.returnCallback = (req, res) => {
    passport.authenticate("steam", { failureRedirect: "/" })(req, res, () => {
        res.redirect("/api/auth/user");
    });
};

exports.userData = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user)
}

exports.logout = async (req, res) => {
    req.logout(() => {});
    res.json({ message: "Logged out" });
}