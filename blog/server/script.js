const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const directoryPath = path.join(__dirname, './public/background');
const mongoUrl = 'mongodb://localhost:27017/blog';  // 修改为您的MongoDB URI

// 定义artwork模型
const artworkSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    }
}, {
    timestamps: true  // 开启时间戳
});
const Artwork = mongoose.model('Artwork', artworkSchema);

async function saveToMongo(files) {
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await Artwork.deleteMany();

        const docs = files.map(file => ({ path: `./background/${file}` }));
        await Artwork.insertMany(docs);

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
});
