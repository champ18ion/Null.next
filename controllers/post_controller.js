const Post = require('../models/post');
const Comment = require('../models/comment')

module.exports.create = function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log("error in creating Post")
        }
        return res.redirect('back');

    })
}
module.exports.addComment = function (req,res) {
    Comment.create({
        content:req.body.comment,
        user:req.user._id,
        // post:req.post._id
        

    },function(err,comments){
        console.log(req.post)
        return res.redirect('back')
        
    })
    
}
