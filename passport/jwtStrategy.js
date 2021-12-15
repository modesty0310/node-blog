const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
//JWT Strategy
module.exports = () => {
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
  },
  function (jwtPayload, done) {
    return User.findOneById(jwtPayload.id, (err, user) => {
      if(err || !user) {
        return done(err);
      }else{
        return done(null, user);
      };
    });
  }
  ));
}
