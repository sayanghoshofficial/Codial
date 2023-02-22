const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function(req,res){
    try{
        // populate the user of each post
        let posts = await Post.find({})
        .sort('-createAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            options: {
                sort: { createdAt: -1 } // sort comments by timestamp in descending order
            }
        });
        // .exec(function(err,posts){
        let users = await User.find({});


        return res.render('home',{
            title: "Codial | Home",
            posts: posts,
            all_users: users
        });
    }
    catch(err){
        console.log('Error', err);
        return;
    }
    
        
        
  
    
}