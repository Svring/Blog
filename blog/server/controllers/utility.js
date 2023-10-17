const Post = require('../models/post');

module.exports = {

    dummy: async (req, res) => {
        const postId = "6503fe94939b887b26055f8f";
        const posts = await Post.findById(postId);
        res.status(200).send(posts);
    },

    time: async (req, res) => {
        const documents = await Post.find().sort({ createdAt: -1 });
        const documentsIsoDate = documents.map(doc => doc.createdAt);

        function organizeDates(dates) {
            const organizedList = [];
            const monthNames = ["January", "February", "March", "April", "May",
                "June", "July", "August", "September", "October", "November", "December"];

            dates.forEach(date => {
                const year = date.getFullYear().toString(); // 转换为字符串以方便后续比较
                const month = monthNames[date.getMonth()];

                // 查找对应年份的对象
                let yearObj = organizedList.find(item => item.label === year);

                // 如果年份对象不存在，创建一个
                if (!yearObj) {
                    yearObj = { label: year, children: [] };
                    organizedList.push(yearObj);
                }

                // 如果月份还不存在，则添加到年份对象的 children 中
                if (!yearObj.children.some(child => child.label === month)) {
                    yearObj.children.push({ label: month });
                }
            });

            return organizedList;
        }

        const timeline = organizeDates(documentsIsoDate);
        //sent timeline back to frontend
        res.status(200).send(timeline);
    },

    server: () => {
        const port = server.address().port;
        console.log('Listening at http://0.0.0.0:' + port);
    },

}