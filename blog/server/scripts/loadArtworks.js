const mongoose = require('mongoose');
const fs = require('fs-extra');
const path = require('path');
const Artwork = require('../models/artwork');

async function loadAndSaveJSON(directory) {
    await mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        const files = await fs.readdir(directory);

        for (const file of files) {
            if (path.extname(file) === '.json') {
                const filePath = path.join(directory, file);
                const data = await fs.readJson(filePath);

                if (data.appellation && data.introduction && data.path && data.date) {
                    const existingArtwork = await Artwork.findOne({ appellation: data.appellation });

                    if (!existingArtwork) {
                        const artwork = new Artwork(data);
                        await artwork.save();
                        console.log(`Saved artwork from file: ${file}`);
                    }
                } else {
                    console.warn(`File ${file} does not have all required fields.`);
                }
            }
        }
    } catch (err) {
        console.error('Error reading or saving json files:', err);
    }
}

loadAndSaveJSON('../public/artworks/intro')  // 这里请替换为你的JSON文件夹路径
    .then(() => {
        console.log(`Done processing files. Current time: ${new Date().toLocaleString()}`);
    });

module.exports = loadAndSaveJSON;
