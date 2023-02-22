const Comment = require('../models/comment'); 
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorkers = require('../workers/comment_email_workers');
const queue = require('../config/kue');



module.exports.create = async function(req,res){
    console.log('controller')
    try{
        let post = await Post.findById(req.body.post);
        
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
                
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user','name email');
            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if(err){console.log('Error in creating a queue'); return;}

                console.log('job enqueued', job.id);
            })
            if(req.xhr){
                console.log('xhr',comment);
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "comment created!"
                });
            }
            req.flash('success','Comment added successfully !...')
                        
            res.redirect('/');
        }
        }catch(err){
            console.log('catch',err);
            req.flash('error',err);
            return res.redirect('back');
        }
        
    }
   

//deleting comments
module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        
    if(comment.user == req.user.id){
            
        let postId = comment.post;

        comment.remove();

        let post = await Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}});
        // send the comment id which was deleted back to the views
        if(req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message:"Post deleted"
            });
        }
        req.flash('success','Comment deleted successfully !...')
        return res.redirect('back');

        }else{
            req.flash('error','You can not delete this comment!...')
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
    
}