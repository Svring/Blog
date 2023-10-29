const mongoose = require('mongoose');
const Background = require('../models/background');  // 确保路径是正确的
const fs = require('fs-extra');
const path = require('path');

async function loadAndSaveImages(directory) {
    await mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        const files = await fs.readdir(directory);

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();

            if (ext === '.png' || ext === '.jpeg') {
                let filePath = path.join(directory, file);
                filePath = filePath.replace('./public/', '/');
                const existingBackground = await Background.findOne({ path: filePath });

                if (!existingBackground) {
                    const background = new Background({ path: filePath });
                    await background.save();
                    console.log(`Saved background from file: ${file}`);
                } else {
                    console.log(`Background from file ${file} already exists in the database.`);
                }
            }
        }
    } catch (err) {
        console.error('Error reading or saving image files:', err);
    }
}

module.exports = loadAndSaveImages;
