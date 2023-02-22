const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
             usernameField: 'email',
             passReqToCallback: true
        },
        function(req,email,password,done){
            //find user and establish the identity
            User.findOne({email:email}, function(err,user){
                if(err){
                    // console.log('Error in finding User -----> Passport');
                    req.flash('error',err);
                    return done(err);
                }
                if(!user || user.password != password){
                    // console.log('Invalid UserName / PassWord');
                    req.flash('error','Invalid Username/Password')
                    return done(null,false);
                }
                return done(null,user);
            })
        }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


//deserailizing the user form the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding User -----> Passport');
            return done(err);
        };
        return done(null,user);
    });
});

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if user is sign in , the pass the request to the next function(controller's action)
    if(req.isAuthenticated()){
        // console.log(req)
        return next();
    }

    //if user is not sign in
    return res.redirect('/users/sign_in')
};

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the local views
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;