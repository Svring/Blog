const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Background = require('./models/background');
const Artwork = require('./models/artwork');

const directoryPath = path.join(__dirname, './public/background');
const mongoUrl = 'mongodb://localhost:27017/blog';  // 修改为您的MongoDB URI

async function main() {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    await Artwork.deleteMany({});

    await mongoose.disconnect();
}

main();
/* async function saveToMongo(files) {
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        const docs = files.map(file => ({ path: `./background/${file}` }));
        await Background.insertMany(docs);

        console.log('Files paths saved to MongoDB.');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    } finally {
        await mongoose.disconnect();
    }
}

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory', err);
        return;
    }

    const jpegFiles = files.filter(file => path.extname(file).toLowerCase() === '.jpeg');
    saveToMongo(jpegFiles);
}); */
