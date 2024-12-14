const posts = require('../models/postModel')



// add post - autherisation needed
exports.addPostController = async (req, res) => {
    console.log("Inside addPostController");
    const userId = req.userId  // from verifing token by jwtmiddileware
    console.log(userId);
    const { username, profileImg, title, description } = req.body
    const media = req.file.filename
    console.log(username, profileImg, title, description, media);
    try {
        const newPost = new posts({
            username, profileImg, title, description, media
        })
        await newPost.save()
        res.status(200).json(newPost)

    } catch (err) {
        res.status(401).json(err)

    }
}

// to get all posts 
exports.allPostController = async (req, res) => {
    console.log("Inside getAllPostController");
    try {
        const allHomePosts = await posts.find()
        res.status(200).json(allHomePosts)
        console.log(allHomePosts);
        
    } catch (err) {
        res.status(401).json(err)
    }
}