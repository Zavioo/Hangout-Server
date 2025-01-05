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
    // console.log("Inside getAllPostController");
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
// to like post
exports.updateLikesController = async (req, res) => {
    console.log("Inside updateLikesController");
    const { id } = req.params; // Post ID to update
    const userId = req.userId;
    console.log("Current User Id" + userId);

    // User ID of the liker/unliker (assuming it's set by middleware)

    try {
        // Find the post and update the likes array
        const post = await posts.findById(id);
        if (!post) {
            return res.status(404).json("Post Not Fount");
        } else {
            // Check if the user has already liked the post
            const hasLiked = post.likes.includes(userId);

            console.log(hasLiked);


            // Update the likes array
            const updatedLikes = hasLiked
                ? post.likes.filter((id) => id !== userId) // Remove like
                : [...post.likes, userId]; // Add like
            console.log(updatedLikes);

            // Save the updated post
            const updatedPostLike = await posts.findByIdAndUpdate(
                { _id: id },
                { likes: updatedLikes },
                { new: true } // Return the updated document
            );
            await updatedPostLike.save()
            res.status(200).json(updatedPostLike)
        }

    } catch (err) {
        console.error("Error updating likes:", err.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Function to add a comment to a post
exports.addCommentController = async (req, res) => {
    const { id } = req.params; // Get post ID from request parameters
    const { userId, comment, username, userProfilePic } = req.body; // Get user ID and comment from request body
    console.log(id);

    try {
        // Find the post by ID
        const post = await posts.findById(id);
        if (!post) {

            return res.status(404).json({ message: "Post not found" });

        } else {
            // Add the new comment to the comments array
            post.comments.push({ userId, comment, username, userProfilePic });
            const updatePost = await post.save(); // Save the updated post
            res.status(200).json(updatePost);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.removeCommentController = async (req, res) => {
    console.log("Inside removeCommentController ");
    
    const { id } = req.params
    const { postId } = req.body
    console.log(id, postId);
    try {

        const post = await posts.findById(postId);

        console.log(post.comments);
        
        const commentIdToRemove = id
        const updatedComments = post.comments.filter(comment => comment._id !== commentIdToRemove);
        console.log("New" + updatedComments);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}