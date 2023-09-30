const mongoose = require('mongoose');
const express = require('express');
const Post = require('./models/post.js');
const Artwork = require('./models/artwork.js');
const Background = require('./models/background.js');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect('mongodb://localhost/blog',
    { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

//Dummy route for testing connection
app.get('/api', async (req, res) => {
    const postId = "6503fe94939b887b26055f8f";
    const posts = await Post.findById(postId);
    res.status(200).send(posts);
});

//return a list contains the whole timeline
/** Example data structure
 * [
  {
    label: '2023',
    children: [
      { label: 'September' }
    ]
  },
  {
    label: '2022',
    children: [
      { label: 'January' },
      { label: 'July' }
    ]
  },
  {
    label: '# Main Title',
    children: [
      { 
        label: '## Subtitle 1', 
        children: [
          { label: '### Sub-subtitle 1' },
          { label: '### Sub-subtitle 2' }
        ]
      },
      { label: '## Subtitle 2' }
    ]
  }
]
 */
app.get('/api/time', async (req, res) => {
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
});

//return a specific post by id
app.get('/api/post/:id', async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    res.status(200).send(post);
});

//return a whole list of titles of posts
app.get('/api/posts/', async (req, res) => {
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
});

//return the specific post by searchTerm
app.get('/api/posts/:searchTerm', async (req, res) => {
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
});

app.get('/api/artworks', async (req, res) => {
    const backgrounds = await Background.find();
    const paths = backgrounds.map(artwork => artwork.path);

    const artworks = await Artwork.find();
    const transformedArtworks = artworks.map(item => {
        const date = new Date(item.createdAt);
        return {
            path: item.path,
            appellation: item.appellation,
            introduction: item.introduction,
            year: date.getFullYear(),
            month: date.getMonth() + 1, // getMonth() 返回 0-11
            day: date.getDate()
        };
    });

    res.status(200).send({backgrounds: paths, artworks: transformedArtworks});
});

const server = app.listen(3000, function () {
    const port = server.address().port;
    console.log('Listening at http://localhost:' + port);
});
