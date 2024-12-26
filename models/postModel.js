const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // References the users schema
        required: true,
    },
    username: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    media: {
        type: String,
    },
});

const posts = mongoose.model('posts', postSchema);

module.exports = posts;
