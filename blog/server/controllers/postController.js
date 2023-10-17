const Post = require('../models/post');

module.exports = {

    findOne: async (req, res) => {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        res.status(200).send(post);
    },

    findAll: async (req, res) => {
        Post.find({})
            .then(docs => {
                docs.sort((a, b) => {
                    return a.createdAt.getTime() - b.createdAt.getTime();
                });

                const result = docs.map(doc => {
                    return {
                        title: doc.title,
                        year: doc.createdAt.getFullYear(),
                        month: doc.createdAt.getMonth() + 1,
                        day: doc.createdAt.getDate(),
                        id: doc._id
                    };
                });

                res.status(200).send(result);
            })
            .catch(err => {
                console.error('Error:', err);
            });
    },

    searchOne: async (req, res) => {
        const searchTerm = req.params.searchTerm;
        let query = {};

        // 如果存在 searchTerm，则根据 searchTerm 更新查询条件
        if (searchTerm) {
            query.title = new RegExp(searchTerm, 'i');
        }

        Post.find(query)
            .then(docs => {
                if (!docs.length && searchTerm) {
                    return res.status(200).send([]);
                }

                docs.sort((a, b) => {
                    return a.createdAt.getTime() - b.createdAt.getTime();
                });

                const result = docs.map(doc => {
                    return {
                        title: doc.title,
                        year: doc.createdAt.getFullYear(),
                        month: doc.createdAt.getMonth() + 1,
                        day: doc.createdAt.getDate(),
                        id: doc._id.toString()
                    };
                });

                res.status(200).send(result);
            })
            .catch(err => {
                console.error('Error:', err);
            });
    },

    
}