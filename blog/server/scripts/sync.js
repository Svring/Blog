const git = require('simple-git');
const cron = require('node-cron');
const loadAndSaveJSON = require('./loadArtworks');

const directoryArtworkPath = '../public/artworks/intro';

// 定义一个函数执行 git pull
function executeSync() {
    console.log("Running git pull...");

    // 在当前目录中执行 git pull
    git().pull((err, update) => {
        if (err) {
            console.error("Error during git pull:", err, `Current time: ${new Date().toLocaleString()}`);
            return;
        }

        if (update && update.summary.changes) {
            console.log("Updated files:", update.files, `Current time: ${new Date().toLocaleString()}`);
        } else {
            console.log(`No updates. Current time: ${new Date().toLocaleString()}`);
        }
    });

    loadAndSaveJSON(directoryArtworkPath)
        .then(() => {
            console.log(`Done processing files. Current time: ${new Date().toLocaleString()}`);
        });
}

// 使用 node-cron 每半小时执行一次
cron.schedule('*/30 * * * *', executeSync);

// 在启动时执行一次
executeSync();
