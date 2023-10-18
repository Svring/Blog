const git = require('simple-git');
const cron = require('node-cron');

// 定义一个函数执行 git pull
function executeGitPull() {
    console.log("Running git pull...");

    // 在当前目录中执行 git pull
    git().pull((err, update) => {
        if (err) {
            console.error("Error during git pull:", err);
            return;
        }

        if (update && update.summary.changes) {
            console.log("Updated files:", update.files);
        } else {
            console.log("No updates.");
        }
    });
}

// 使用 node-cron 每半小时执行一次
cron.schedule('*/30 * * * *', executeGitPull);

// 在启动时执行一次
executeGitPull();
