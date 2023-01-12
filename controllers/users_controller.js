const User = require('../models/user');
const fs = require('fs');
const path = require('path')

module.exports.update = async function(req,res){
    if(req.user.id==req.params.id){
        try {
            let user = await  User.findByIdAndUpdate(req.params.id)
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('*#**$$multer error',err);}
               
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success','uploaded successfully')
                return res.redirect('back')
            })
            
        } catch (error) {
            req.flash('error',error);
            return res.redirect('back');
            
        }
       

    }else{
        return res.status(401).send('Unauthorised');
    }
    
}
module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        })

    })
   
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Void | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Void | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error','password does not match')
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error',err) 
        return res.redirect('back')}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error',err); return}
                
                req.flash('success','Signed Up successfully')
                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('error','user already exist');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','logged in successfully')
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){console.log("error");}
        req.flash('success','logged out')
        return res.redirect('/');

    });

    
}