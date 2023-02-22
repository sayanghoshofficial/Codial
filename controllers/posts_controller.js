const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user')

module.exports.create = async function(req,res){
    try{
        let post = await  Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        let postUser = await User.findById(post.user._id);
        console.log(post.user);
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post,
                    postUser:postUser.name
                },
                message: "Post Created!"
            });
        }

        req.flash('success','Post Published!...');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    // function(err,post){
    //     if(err){console.log('Error in creating the post'); return;}   
    // })
}
// deleting a post
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id );
        //.id means to convert the object id to string
        if(post.user == req.user.id){
            post.remove();
            
            await Comment.deleteMany({post: req.params.id});


            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                })
            }

            req.flash('success','Post and associated comments deleted')

            return res.redirect('back');
           
        }else{
            req.flash('error','You can not delete this post...')
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
    
};
