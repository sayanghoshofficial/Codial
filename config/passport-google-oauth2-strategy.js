const passport = require('passport');
const googleStrstegy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use a new strategy for google login
passport.use(new googleStrstegy({
        clientID: "437838793536-c5eo8912ivqgi74s5tia38fl5cr47g4o.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        //find the use
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('Error in google strategy-passport',err); return;}

            console.log(profile);

            if(user){
                //if found set this as req.user
                return done(null,user);
            }else{
                //if not found create the user and set this req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){console.log('Error in creating user google strategy-passport',err); return;}

                    return done(null,user);
                });
            }
        });
    }

));

module.exports = passport;