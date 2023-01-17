const mongoose = require('mongoose')
const User = require('./user')

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // include array of id's of all comments
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
    

        }
       
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'

        }
    ]
    
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;