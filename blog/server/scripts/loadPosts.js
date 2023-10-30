const mongoose = require('mongoose');
const Post = require('../models/post');  // 确保路径是正确的
const fs = require('fs-extra');
const path = require('path');

async function loadAndSaveMDFiles(directory) {
    await mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        const files = await fs.readdir(directory);

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();

            if (ext === '.md') {
                const filePath = path.join(directory, file);
                const fileContent = await fs.readFile(filePath, 'utf-8');

                // 解析文件的标题和内容
                const match = fileContent.match(/^#\s*(.+)\s*([\s\S]+)$/);
                if (match && match.length === 3) {
                    const title = match[1].trim();
                    const content = match[2].trim();
                    const postPath = `./posts/${path.basename(file, '.md')}`;

                    const existingPost = await Post.findOne({ path: postPath });

                    if (!existingPost) {
                        const post = new Post({
                            title: title,
                            content: content,
                            path: postPath
                        });
                        await post.save();
                        console.log(`Saved post from file: ${file}`);
                    } else {
                        console.log(`Post from file ${file} already exists in the database.`);
                    }
                }
            }
        }
    } catch (err) {
        console.error('Error reading or saving MD files:', err);
    }
}

module.exports = loadAndSaveMDFiles;
