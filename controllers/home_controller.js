const Post = require('../models/post');
const User = require('../models/user')

module.exports.home =  async function(req, res){

  try {
    let posts =  Post.find({})
    .populate('user')
    .populate({
    path: 'comments',
    populate: {
        path: 'user'
    }
   });
   
        
    let users = User.find({});
            
    return res.render('home', {
        title: "Void | Home",
        posts:  posts,
        all_users:users
    });

}catch (err) {
    console.log(err);
    return;
    
  }  
}
// populate user of each post


// module.exports.actionName = function(req, res){}