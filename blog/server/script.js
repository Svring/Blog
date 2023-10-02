const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Background = require('./models/background');
const Artwork = require('./models/artwork');

const directoryPath = path.join(__dirname, './public/artworks');
const mongoUrl = 'mongodb://localhost:27017/blog';  // 修改为您的MongoDB URI

async function saveToMongo(files) {
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        const docs = files.map(file => (
            {
                path: `./artworks/${file}`,
                appellation: '',
                introduction: ''
            }));

        await Artwork.insertMany(docs);

        console.log('Files paths saved to MongoDB.');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    } finally {
        await mongoose.disconnect();
    }
}

async function saveToMongoSingle(file) {
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        /* const docs = files.map(file => (
            {
                path: `./artworks/${file}`,
                appellation: '',
                introduction: ''
            })); */
        
        const doc = {
            path: `./artworks/${file}`,
            appellation: 'Pink_Bang_Girl',
            introduction: 'Girl with black hair and blunt bang, not my work but is beautiful.'
        };

        await Artwork.create(doc);

        console.log('Artwork saved to MongoDB.');
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
    const specificJpegFile = files.filter(file => file.includes('Pink_Bang_Girl'));

    //saveToMongo(jpegFiles);
    saveToMongoSingle(specificJpegFile);
});
