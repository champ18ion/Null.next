const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId
   },
   like:{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    refPath:'onModel'
   },
   onModel:{
    type:String,
    require:true,
    enum:['Post','Comment']
   }
    
},{
    timestamps:true,
})

const Like = mongoose.model('Like','LikeSchema')
module.exports = Like;