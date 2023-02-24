const Like = require('../models/likes');
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.toggleLike = async function(req,res){
    try{
        // likes/toggle/?id=abdcef&type=post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if like alreeady exits
        let exitingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        //if a like already exits then delete it
        if(exitingLike){
            likeable.likes.pull(exitingLike._id);
            likeable.save();

            exitingLike.remove();
            deleted = true;
        }else{
            // make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.json(200,{
            message: "Request Successful",
            data:{
                deleted : deleted
            }
        })

    }catch(err){
        console.log(err);
        return res.json(500,{
            message: "Internal server error"
        })
    }
}