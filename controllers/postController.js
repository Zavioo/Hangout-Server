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

//edit and update post
exports.editPostController = async (req, res) => {
    console.log("Inside editPostController");
    const id = req.params.id
    const userId = req.userId
    const { username, title, description, media } = req.body
    const reUploadMedia = req.file ? req.file.filename : media
    try {
        const updatePost = await posts.findByIdAndUpdate({ _id: id }, {
            userId, username, title, description, media: reUploadMedia

        }, { new: true })           // {new:true} for updation
        await updatePost.save()      // to save changes in mongodb
        res.status(200).json(updatePost)
    } catch (err) {
        res.status(401).json(err)
    }

}

// remove post
exports.removePostController = async (req, res) => {
    console.log(("Inside removePostController"));
    const { id } = req.params
    try {
        const deletePost = await posts.findByIdAndDelete({ _id: id })
        res.status(200).json(deletePost)
    } catch (err) {
        res.status(401).json(err)
    }
}