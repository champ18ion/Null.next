const Comment=require('../models/comment');
const Post=require('../models/post');
const Like = require('../models/like')
//creating a comment
module.exports.create=async function(req,res){
  
    try{
       let post=await Post.findById(req.body.post);
       if(post){
           
           let comment=await Comment.create({
            //req.body contains content and post id
              content:req.body.content,
              post:req.body.post,
              user:req.user._id
           });
               
               //pushing the comment in the field 'comments' of post
               //added comment to the post.
               post.comments.push(comment);
               //saving 
               post.save();
               req.flash('success','comment added');
               return res.redirect('/');
       }
    }
    catch(err){
        req.flash('error',err)
        return res.redirect('back');
    }
   
}
//deleting a comment
module.exports.destroy=async function(req,res){
    try{
    let comment=await Comment.findById(req.params.id);

            let postId=comment.post;
            let post=await Post.findById(postId);
                let userId=post.user;
                if(post.user==req.user.id||comment.user == req.user.id){

                     //deleting likes before deleting comments 
                     await Like.deleteMany({likeable:comment,onModel:'Comment'});
                    comment.remove(); 
                    let postId=comment.post;
                    let post=await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
                        req.flash('success','comment deleted')
                        return res.redirect('back');           
                }
                else{
                    req.flash('error','unauthorized')
                    return res.redirect('back');
                }
    }
    catch(err){
        req.flash('error','comment deletetion error');
        return res.redirect('back');
    }       
}