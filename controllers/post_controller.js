const Post = require('../models/post');
const Comment = require('../models/comment')
const Like = require('../models/like')


module.exports.create = async function(req,res){
    try {
            await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        req.flash('success','posted successfully')
        return res.redirect('back');


    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
    
}

module.exports.destroy = async function(req,res){
    try {

        let post = await Post.findById(req.params.id);
     if(post.user == req.user.id){

          //deleting likes of posts before deleting posts 
          await Like.deleteMany({likeable:post,onModel:'Post'});
          //deleting likes of comments before deleting comments of posts
          await Like.deleteMany({_id: {$in: post.comments}});
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        req.flash('success','post deleted successfully');
        return res.redirect('back')
     }else{
        req.flash('error','error in deleting post')
        return res.redirect('back')
     }
        
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
        
    }
    
    }