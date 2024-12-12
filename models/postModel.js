const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    profileImg: {
        type: String,
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    media: {
        type: String
    }
})

const posts = mongoose.model("posts",postSchema)

module.exports = posts