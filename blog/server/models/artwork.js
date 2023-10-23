const mongoose = require('mongoose');

// 定义artwork模型
const artworkSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    },
    appellation: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true  // 开启时间戳
});

const Artwork = mongoose.model('Artwork', artworkSchema);
module.exports = Artwork;
