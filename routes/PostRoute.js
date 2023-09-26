const express = require('express')
const PostController= require('../controller/PostController')
const multer= require('multer')
const path= require('path')
const router=express.Router();

const upload=multer({dest: 'upload/post/PostAvtar'})

router.post('/save',upload.single('postAvtar'),PostController.postDataSave);

router.get('/delete/:id',PostController.deletePost);
  
 module.exports=router;