 const Post = require('../../../models/post')
 const Comment = require('../../../models/comment')
 module.exports.index = async function(req,res){
    
    let posts =await Post.find({})
    .populate('user')
    .populate({
    path: 'comments',
    populate: {
        path: 'user'
    }
   });
    
    
    
    return res.status(200).json({
        message:"list of Posts",
        posts: posts
    })
 }

 module.exports.destroy = async function(req,res){
    try {

        let post = await Post.findById(req.params.id);
    //  if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        // req.flash('success','post deleted successfully');
        return res.status(200).json({message: 'post deleted'})
    //  }else{
    //     req.flash('error','error in deleting post')
    //     return res.redirect('back')
    //  }
        
    } catch (error) {
        return res.status(200).json({message:error});
        
    }
    
    }