const express = require('express');
require('dotenv').config();
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const session = require('express-session');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
//const uri = process.env.MONGODB_URI;



//MongoDB database

mongoose.connect( "mongodb+srv://GhostAdmin1:Trekids9@clusterfh.enmxjvj.mongodb.net/",
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const db = mongoose.connection;


mongoose.connection.on('connected', () => {
  console.log('Mongoose successfully connected to MongoDB.');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB.');
});

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

//Model schema
const userSchema = new mongoose.Schema({
  discordId: String,
  nickname: String,
  avatar: String
  // ... other fields
  });
  const User = mongoose.model('User', userSchema);



// Passport Configuration
passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CALLBACK,
  scope: ['identify', 'guilds.join']
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile); // This is just for debugging to see the profile information.
    const discordId = profile.id;
    const username = profile.username;
    let avatarURL;
    if(profile.avatar) {
      avatarURL =`https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
    } else {
    // default avatar or some placeholder
       avatarURL = 'path_to_default_avatar.png';
}
      User.findOne({ discordId: discordId })
        .then(user => {
          if (user) {
          // User found in the DB, proceed as needed
          return done(null, user);
          } else {
          // User not found, create a new one
          const newUser = new User({
            discordId: discordId,
            nickname: username,
            avatar: avatarURL
          });
      newUser.save()
        .then(savedUser => {
           return done(null, savedUser);
      })
         .catch(err => {
          return done(err, null);
      });
      }
      })
      .catch(err => {
         return done(err, null);
      });

    }));


    /*
    User.find({ discordId: profile.id }).then(users => {
      console.log(users);
      });
      */
passport.serializeUser((user, done) => {
done(null, user);
});

passport.deserializeUser((obj, done) => {
done(null, obj);
});


// Middleware
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET || 'yourOwnSecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// Routes
app.get('/auth/discord', passport.authenticate('discord'));
console.log('passport start');
app.get('/auth/discord/callback',
passport.authenticate('discord', { failureRedirect: '/forbidden' }),
(req, res) => {
res.redirect('https://forgottenheralds-alpha.vercel.app/router/dashboard');
}
);

// Middleware to check if user is authenticated
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
      console.log('authorized');
      return next();
  } else {
      console.log('Not authorized');
      res.redirect('/');
  }
}

// Landing route, which just serves the page without any authentication check
app.get('/', (req, res) => {
  res.send('Welcome to the landing page.');
});

// Any route that requires authentication can use the checkAuth middleware
app.get('/dashboard', checkAuth, (req, res) => {
  res.redirect('https://forgottenheralds-alpha.vercel.app/router/dashboard');
});

app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
    isAuthenticated: true,
    user: {
        id: req.user.id,
        username: req.user.username,
        avatar:
        `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`
        }
  });
  } else {
    res.json({ isAuthenticated: false });
  }
  });


app.get('/logout', (req, res) => {
req.logout();
res.redirect('/');
});

app.use((req, res, next) => {
res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`
);
});

module.exports = app;
