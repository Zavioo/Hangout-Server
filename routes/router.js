const express = require('express')

const userController = require("../controllers/userController")
const jwtMiddleware = require('../middlerwears/jwtMiddleware')
const multerMiddleware = require('../middlerwears/multerMiddleware')
const PostController = require('../controllers/postController')


const router = new express.Router()

// Register : http://localhost:3000/register
router.post('/register', userController.registerController)

// // Login : http://localhost:3000/login
router.post('/login', userController.loginController)

// profile updation : http://localhost:3000/edit-user
router.put('/edit-user', jwtMiddleware, multerMiddleware.single('profilePic'), userController.editUserController)

//To Add post :http://localhost:3000/add-post
router.post('/add-post', jwtMiddleware, multerMiddleware.single('media'), PostController.addPostController)

// to get all Posts: http://localhost:3000/all-posts
router.get('/all-posts', PostController.allPostController)

//to edit post - post/10/edit :http://localhost:3000/posts/id/edit
router.put('/post/:id/edit', jwtMiddleware, multerMiddleware.single('media'), PostController.editPostController)

//posts/id/remove :http://localhost:3000/post/id/remove
router.delete('/post/:id/remove', jwtMiddleware, PostController.removePostController)

// to like post : http://localhost:3000/posts/id/like
router.put('/post/:id/like', jwtMiddleware, PostController.updateLikesController)

//to add comments : http://localhost:3000/posts/id/comments
router.put('/post/:id/comments',jwtMiddleware,PostController.addCommentController)

//to remove comments : http://localhost:3000/posts/id/removecomments
router.delete('/post/:id/removecomments',PostController.removeCommentController)

// to get a users posts  http://localhost:3000/getuserposts
router.get('/getuserposts/:id',PostController.getUserPostsController)

module.exports = router 