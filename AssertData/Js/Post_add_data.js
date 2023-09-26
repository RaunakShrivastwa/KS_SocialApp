{
    let createPost = function () {
        let newPost = $('#post-form-data');
        newPost.submit(function (e) {
            e.preventDefault();
    
            // Create a FormData object to capture form data, including files
            const formData = new FormData(this);
    
            $.ajax({
                type: 'post',
                url: '/post/save',
                data: formData, // Use the FormData object
                processData: false, // Prevent jQuery from processing data
                contentType: false, // Set the Content-Type to false to let the browser handle it
                success: function (data) {
                    // Handle success
                    let addDataPost= addPostDom(data.data.post)
                    $('#post-list-container>ul').prepend(addDataPost)
                    deletePostData(' .delete-post-button',addDataPost)
                    addCommentData(data.data.post._id)
                },
                error: function (error) {
                    // Handle error
                }
            });
        });
    };
    
    

    // add post with dom in post list
    let addPostDom=function(post){
        return $(`
          
        <li id="${post._id}"  style="margin-top: 10px;background-color: black;color:white">
                <p>
                        <small><a href="/post/delete/${post._id}" class="delete-post-button">X</a></small>
                            POST :- ${post.content}
                                <br>
                                <small>BY:- ${post.user.name}</small>
                                <section>
                 <img src="${post.pathAvtar}" alt="${post.user.name}" style="width: 40px; border-radius: 50%;" srcset="">
        </section>
                </p>
                <div class="post-comments">
                        <form action="/post/save" method="post" id="post-form-data" enctype="multipart/form-data">
                            <textarea name="content" cols="30" rows="4" placeholder="Enter Text"></textarea>
                            <input type="file" name="postAvtar">
                            <input type="submit" value="PostC">
                        </form>
                        <div>
                                <ul id="post-comments-${post._id}">
                                    
                                </ul>
                        </div>
                </div>
        </li>
        
        `)
    }


    //  for the delte post
     let deletePostData = function(deletelink) {
        $(deletelink).click(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deletelink).prop('href'),
                success: function(data) {
                    deleteListItem(data.data.post_id);
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    function deleteListItem(itemId){
        var listItem=document.getElementById(itemId)
        if(listItem){
            listItem.parentNode.removeChild(listItem)
        }else{
            console.log("Item not found")
        }
    }


    // add comment on post
    let addCommentData= function(postId){
        let newPost= $('.comment-data')
        newPost.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comment/save',
                data: newPost.serialize(),
                success: function(data){
                    console.log(data.data.comment)
                    let comment=data.data.comment;
                    // alert(comment._id)
                    let commentDom1 = commentDom(comment)

                    $(`#post-comments-${postId}`).prepend(commentDom1)

                },
                error: function(error){
                    console.log(error.responseText)
                }
            })
        })
    }

    function commentDom(comment){
        return $(`
         
        <li id="comment-${comment._id}">
                        <p>
                            <small>
                                <a href="/comment/delete/${comment.id}" class="delete-comment-button">X</a>
                            </small>
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                        </p>
                    </li>
        
        `)
    }

    function deleteComment(deleteCommentLink){
        $(deleteCommentLink).click(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteCommentLink).prop('href'),
                success: function(data) {
                    deleteListItem(data.data.comment_id);
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    

    createPost();
    addCommentData();
}