module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'Users Profile'
    });
}