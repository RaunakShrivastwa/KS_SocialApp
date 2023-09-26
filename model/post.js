const mongoose = require('mongoose');
const multer= require('multer')
const path= require('path')
const AVATAR_PATH= path.join('/upload/post/PostAvtar')

// const User= require('./user')
const postSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    postAvtar:{
        type: String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
    
},{
    timestamps:true
});

let Poststorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

postSchema.statics.Postavtar = multer({ Poststorage }).single('postAvtar');
postSchema.statics.PostavtarPath = AVATAR_PATH;

const Post=mongoose.model('Post',postSchema);

module.exports=Post;
