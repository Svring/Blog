// db.js
const mongoose = require('mongoose');
const Post = require('./models/post.js');

export const getMDXContent = (postId) => {
    return mongoose.connect('mongodb://localhost:27017/blog')
        .then(() => {
            console.log('hello');
            return Post.findById(postId);
        })
        .then(post => {
            mongoose.connection.close();
            if (post) {
                return post.content;
            }
        })
        .catch(error => {
            console.log(error);
        })
};
