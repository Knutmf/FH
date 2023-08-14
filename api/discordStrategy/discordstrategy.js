const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;


// Use the routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
config/passport-discord.js;

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
config/passport-discord.js;


passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI,
    scope: ['identify', 'email'] // Add more scopes if needed.
    }, function(accessToken, refreshToken, profile, done) {
    // This is where you'd typically link your Discord profile to a user in your database.
    // For the sake of simplicity, we'll just pass the profile data forward.
    return done(null, profile);
    }));