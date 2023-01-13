const User = require('../../../models/user');
const jwt = require('jsonwebtoken')

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({email:req.body.email})
    if(!user || user.password != req.body.password){
      return res.status(422).json({message:'invalid username or password'})
    }
    return res.status(200).json({
      message:'sign in successful',
      data:{
        token:jwt.sign(user.toJSON(),'void',{expiresIn:'200000'})

    }
    })
    
  } catch (error) {
    console.log('error',error)
    return res.status(500).json({message:'internal server error'})
    
  }
    
  };