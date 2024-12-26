const posts = require('../models/postModel')

// add post
exports.addPostController = async (req, res) => {
    console.log("Inside addPostController");
    const userId = req.userId; // Extracted from JWT middleware
    const { username, title, description } = req.body;
    const media = req.file ? req.file.filename : null;

    try {
        const newPost = new posts({
            userId, // Store the user ID
            username,
            title,
            description,
            media,
        });
        await newPost.save();
        res.status(200).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(401).json(err);
    }
};

// to get all posts 
exports.allPostController = async (req, res) => {
    console.log("Inside getAllPostController");
    try {
        const allPosts = await posts.find().populate('userId', 'profilePic'); // to get profilePic from users
        res.status(200).json(allPosts);
    } catch (err) {
        console.error(err);
        res.status(401).json(err);
    }
};