const postSchema = require('../model/post');
const comment = require('../model/comment')
const path = require('path');
const fs = require('fs')

// const postSchema = require('./postSchema'); // Import your post schema module

module.exports.postDataSave = async (req, res) => {
  console.log(req.body)
  console.log(req.file)
  try {
    const postData = {
      content: req.body.content,
      user: req.user._id,
    };
    console.log(req.body)
    if (req.file) {
      postData.postAvtar = postSchema.PostavtarPath + '/' + req.file.filename;
    }

    try {
          const createdPost = await postSchema.create(postData);

          if (req.xhr) {
            return res.status(200).json({
              data: {
                post: createdPost,
              },
              message: 'Post Created By Ajax',
            });
          }

      return res.redirect('/');
      // Handle file upload with Multer
      // postSchema.Postavtar(req, res, async (err) => {
      //   if (err) {
      //     console.error('*****Multer Error', err);
      //     return res.status(500).json({ error: 'Multer Error' });
      //   }

      //  });
    } catch (err) {
      req.flash('error', err);
      console.error('Error', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }}
    catch (err) {
      req.flash('error', err);
      console.error('Error', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }




// Import the Post model

// module.exports.postDataSave = (req, res) => {
//     const data = {
//         content: req.body.content,
//         user: req.user._id,
//     };

//     console.log('Request File:', req.file); // Add this line for debugging

//         console.log('Uploaded File:', req.file); // Add this line for debugging

//         if (req.file) {
//             data.postAvtar = AVATAR_PATH + '/' + req.file.filename;
//         }

//         // Use the Post model to create a new post
//         Post.create(data)
//             .then((result) => {
//                 console.log('Post Added successfully!!!');
                // if (req.xhr) {
                //     return res.status(200).json({
                //         data: {
                //             post: result,
                //         },
                //         message: 'Post Created By Ajax',
                //     });
                // }

//                 return res.redirect('/');
//             })
//             .catch((err) => {
//                 console.log('There is a problem with post added:', err);
//                 return res.status(500).json({
//                     error: 'Internal Server Error',
//                 });
//             });
// };



// for the delete post
module.exports.deletePost = async (req, res) => {
    try {
      let post = await postSchema.findById(req.params.id);
      // console.log(post.user);

      if (post.user == req.user.id) {
        post.deleteOne();
        await comment.deleteMany({ post: req.params.id });

        if (req.xhr) {
          return res.status(200).json({
            data: {
              post_id: req.params.id
            },
            message: "Post Deleted!👍"
          })
        }

        req.flash('success', 'Post and associated comments deleted👍!');
        return res.redirect('back');
      } else {
        req.flash('error', 'You cannot delete this post!');
        return res.redirect('back');
      }

    } catch (err) {
      req.flash('error', err);
      console.log("Error", err);
      return;
    }
  }