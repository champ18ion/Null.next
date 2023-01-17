const Like = require('../models/like')
const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.toggleLike = async function(req,res){{
     
    try {
        let likeable;
        let deleted = false;

        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id).populate('likes');
        }
        // /likes/toggle/?id=abcde&type=Comment
        else{
            likeable=await Comment.findById(req.query.id).populate('likes');
        }

        // check if like alrady exist
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })

        // if like exist 
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            likeable.likes.push(newLike._id)
            likeable.save();
        }
         
        req.flash('success','like added')
        return res.redirect('back')
        
    } catch (error) {
        req.flash('error','Something went horrible')
        console.log(error);
        res.redirect('back')
    }

}}