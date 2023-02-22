
{
    //method to submit a from data using Ajax
    let createNewPost = function(){
        let newPostFrom = $('#new-post-from');

        newPostFrom.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostFrom.serialize(),
                success: function(data){
                    console.log(data);
                    //call new post
                   let newPost = newPostDom(data.data.post,data.data.postUser);
                    //call noty for notification
                    // new Noty({
                    //     text: "Post Create!..",
                    //     type: 'success'
                    //   }).show();

                   $('#posts-list-cointainer > ul').prepend(newPost);
                   new PostComments(data.data.post._id);
                   deletePost($(' .delete-post-button', newPost))

                }, error: function(error){
                    // NotyMessage({status:'error',message:error});
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a new post for DOM
    let newPostDom = function(post,postUser){
        return $(`
            <li id="post-${post._id}">
            <p>
            
                
                <small>
                    <a class="delete-post-button"href="/posts/destroy/${post._id} ">X</a>
                </small>
                
                ${post.content}  
                <br>
                <small>
                    ${postUser}
                </small>
            </p>
            <div class="post-comment">
                
            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                <input type="hidden" name="post" value="${ post._id }" >
                <input type="submit" value="Add Comment">
            </form>
                
                <div class="post-comments-list">
                <ul id="post-comment-${post._id}">
                    
                </ul>
            </div>
        </div>
        </li>   `
        )
    }
    //method to delete a post from dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    //remove data without refresh
                    $(`#post-${data.data.post_id}`).remove();
                    //flash noty message
                    // NotyMessage({status:'success',message:'Post Deleted!...'});
                },error: function(error){
                    // NotyMessage({status:'error',message:error});
                    console.log(error.responseText);
                }
            })
        })
    }






    createNewPost();
}