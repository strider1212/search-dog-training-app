const express = require('express')
const router = express.Router()

//Mongoose imports
const { User } = require('../mongoose/user');

//authentication imports
const passport = require('passport')
const jwt = require("jwt-simple");
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;


//app-level middleware
router.use(passport.initialize());

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {

    //replace with a User.findOne (review docs)
    const findUser = await User.findOne({username: username}, (error, user) => {
      if (error) return false;

      if (!user) return false;

      return true;
    }).clone()

    if (findUser) {
      return done(null, username)
    } else {
      return done(null, false)
    }
  })
);
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: "bananas",
    };

    passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, function (payload, done) {
    return done(null, { myUser: "user", myID: payload.sub });
  })
);


//this is to be exported to axiox.post('/singIn')
const tokenForUser = function (user) {
  return jwt.encode(
    {
      sub: user.myID,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    "bananas"
  );
};

const requireSignin = passport.authenticate("login", { session: false });

const requireAuth = passport.authenticate("jwt", { session: false });

module.exports.requireSignin = requireSignin;
module.exports.requireAuth = requireAuth;
module.exports.tokenForUser = tokenForUser;

/*
  Authentication Method
    serverside
      requireAuth to router
    clientside
      add header to axios.post
      add alert to .catch
      test authorized
      test unauthorized
*/


//CLIENT PACKAGE
// axios.post('route', {headers: {Authorization: localStorage.getItem('token')}})
//INSIDE OF CATCH STATEMENTs
// if(error.response.data === "Unauthorized") {
//   alert('Must sign in to perform this action. Your session may have timed out. Please, sign back in and try again.')
// }




//OLD ATTEMPT
// require('dotenv').config();
// const express = require('express')
// const router = express.Router()
// const session = require('express-session');
// const passport = require("passport");
// const bodyParser = require("body-parser");
// const { User } = require('../mongoose/user');


// const LocalStrategy = require("passport-local").Strategy;

// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

// router.use(session({ 
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }));
// router.use(passport.initialize())
// router.use(passport.session());





// passport.use('local', new LocalStrategy((username, password, done) => {
//   console.log(`Then, it will enter the LocalStrategy Middleware, where it will pass a 'username' (${username}) and 'password' (${password}) argument.`)
//   User.findOne({username: username}, (err, user) => {
//     console.log(`Then, it will search the database by the username (${username}).`)
//     console.log(`It will take pass either an error or a user. Both are logged below, error followed by user:`)
//     console.log(err)
//     console.log(user)
//     if(err) return done(err)

//     if(!user) return done(null, false)

//     console.log(`This it will check to see that 'user.password' (${user.password}) matches the password passed as an argument (${password}).`)

//     if(user.password === password) console.log(`It does, so it will return done(null, user), which will pass the user to serializeUser. The user is console logged below:` )
//     console.log(user)

//     if(user.password != password) return done(null, false)

//     return done(null, user)
//   })
// }))

// passport.serializeUser((user, done) => {
//   console.log(`serializeUser will then take the user as an argument. The user is console logged below:`)
//   console.log(user)
//   console.log('serializeUser will then pass the user\'s id through the done argument, which is console logged below:')
//   console.log(user._id)
//   done(null, user._id);
// })


// passport.deserializeUser((id, done) => {
//   console.log(`Then, deserializeUser will pick up the user's id, which is console logged below:`)
//   console.log(id)
//   User.findById(id, (err, user) => {
//     console.log(`Then, User.findById will search the database by the id. It will produce an error or a user.`)
//     console.log('error:')
//     console.log(err)
//     console.log('user:')
//     console.log(user)
//     if(err) return done(err)
//     done(null, user);
//   })
// });



// const checkAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) { return next() }
//   console.log('did not work')
//   res.end()
// }

// router.get('/login', (req, res) => {
//   res.send(req.body)
// })

// const postRequestMiddleware = (req, res, next) => {
//   console.log(`Then it will travel to the POST request on the server side as the value below: `)
//   console.log(req.body)
//   next()
// }


// router.post(
// '/login', 
// postRequestMiddleware,
// passport.authenticate('local'),
// (req, res) => {
//   res.send(req.body)
// }
// )

// router.get('/', (req, res) => {
//   res.send(req.body)
// })


// module.exports = router;