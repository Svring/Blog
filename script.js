const mongoose = require('mongoose');
const fs = require('fs');
const { type } = require('os');

// 读取 MDX 文件
const readMDXFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

// 连接到 MongoDB
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

// 定义 'posts' 集合的模型
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

function extractDataFromMD(doc) {
    const titleMatch = doc.match(/^#\s(.+?)\n$/m);
    const title = titleMatch ? titleMatch[1] : 'Unknown Title';
    return title;
}

// 读取 MDX 文件并存储到 MongoDB
readMDXFile('Hackbar.mdx')
    .then(mdxContent => {
        const mdxTitle = extractDataFromMD(mdxContent);
        const newPost = new Post({ title: mdxTitle, content: mdxContent });
        return newPost.save();
    })
    .then(() => {
        console.log('MD content saved to the database.');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error:', err);
        mongoose.connection.close();
    });
