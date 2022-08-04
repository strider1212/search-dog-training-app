const { authenticate } = require('passport');
const { User } = require('../mongoose/user');
const bcrypt = require('bcrypt');


const LocalStrategy = require('passport-local').Strategy

const initializePassport = (passport, getUserByEmail) => {
  const authenticateUser = async (username, password, done) => {
    const user = getUserByUsername(username);
    if (user == null) {
      return done(null, false, { message: 'No user with that username' })
    }
    
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, {message: 'password incorrect'})
      }
    } catch {
      return done(e)
    }
  }
  passport.use(new LocalStrategy({ usernameField: "username" }, authenticateUser))
  passport.serializeUser((user, done) => {})
  passport.deserializeUser((id, done) => {})
}

module.exports = initializePassport;