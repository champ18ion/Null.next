{   
    //method to send the form data for new post using AJAX..
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            //submit button disabled by this statement..
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                //this converts data into json format i.e key value pairs
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost = newPostDom(data.data.post)
                    $('#posts-list-container>div').prepend(newPost)
                },error:function(error){
                    /*read-only XMLHttpRequest property responseText returns
                      text received from a server following a request being sent.
                    */ 
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post
    let newPostDom = function(post){
        return $(`<div class="w-full h-max-1/5 bg-white p-6" >
        <div class="w-3/4  bg-blue-100 relative p-6 mb-8 mx-auto border border-gray-200 rounded-lg shadow-lg " id="post-${post.id}">
          <span class="block w-full text-blue-600 rounded-xl mx-auto text-center m-2">${post.user.name}</span>
          <div class="h-1/2 w-3/4 mx-auto bg-blue-50 rounded-xl text-center">
            <p class="">${post.content}</p>
          </div>
          
          <small class="absolute bottom-0 right-0 p-2">
            <a href="posts/destroy/${post.id}" class="bg-red-500  p-2 font-bold text-red-100 rounded-xl"> Delete</a>
          </small>
          <%-include('_comment')%>
        </div>
      </div>
      `)
    }
    createPost();
}