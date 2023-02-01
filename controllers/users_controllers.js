const User = require('../models/user')


module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(user){
                return res.render('user_profile',{
                    title: 'Users Profile',
                    user: user
                });
            }
            return res.redirect('/users/sign_in');
        });
    }else{
        return res.redirect('/users/sign_in');
    }
}

//render sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codial || Sign Up"
    })
}
//render sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codial || Sign In"
    })
};

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    console.log('line36',User);
    User.findOne({'email': req.body.email},function(err,user){
        if(err){console.log('Error in finding user in Signing Up'); return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('Error ehile user Signing Up'); return}
                return res.redirect('/users/sign_in')
            })
        }else{
            return res.redirect('back');
        }
    })
}

//Sign in and create a session for the user
module.exports.createSession = function(req,res){
    //steps to authenticate
    //find the user
    
    User.findOne({'email': req.body.email},function(err,user){
        if(err){console.log('Error in finding user in Signing In'); return}
        //handled user found
        if(user){
            //handled password which dosn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //handled seassion creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }else{
            //handled user not found
            return res.redirect('back');
        }
    });

    
    

    
};

