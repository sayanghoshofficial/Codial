const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
    })
   
}


module.exports.update = async function(req,res){
   
    if(req.user.id == req.params.id){
        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log("********Multer Error: ",err)}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //this is just saving the path of the avatar store in the localStorage
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','You are not able to update this');
        return res.status(401).send('Unauthorized');
    }
}


//render sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codial || Sign Up"
    })
}
//render sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codial || Sign In"
    })
};

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('success','Sign Up Successfuly!..');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        // if(err){console.log('Error in finding user in Signing Up'); return}
        req.flash('error',err);

        if(!user){
            User.create(req.body, function(err,user){
                // if(err){console.log('Error while user Signing Up'); return}
                req.flash('error',err);
                return res.redirect('/users/sign_in')
            })
        }else{
            return res.redirect('back');
        }
    })
}

//Sign in and create a session for the user
module.exports.createSession = function(req,res){
    // return res.redirect('/users/profile');
    req.flash('success','Logged in Successfuly!..');
    return res.redirect('/');
};

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','You Have Logged out!');
        res.redirect('/');
      });
}

