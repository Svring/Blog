const mongoose = require('mongoose');

// 定义background模型
const backgroundSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    },
}, {
    timestamps: true  // 开启时间戳
});

const Background = mongoose.model('Background', backgroundSchema);
module.exports = Background;
