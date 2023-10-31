const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const utility = require('./controllers/utility.js');
const postController = require('./controllers/postController.js');
const artworkController = require('./controllers/artworkController.js');

mongoose.connect('mongodb://localhost/blog',
    { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public')));

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/', async (req, res) => res.status(200).send('hello, stranger!'));

//Dummy route for testing connection
app.get('/api', asyncHandler(utility.dummy));

//return a list contains the whole timeline
app.get('/api/time', asyncHandler(utility.time));

//return a specific post by id
app.get('/api/post/:id', asyncHandler(postController.findOne));

//return a whole list of titles of posts
app.get('/api/posts', asyncHandler(postController.findAll));

//return the specific post by searchTerm
app.get('/api/posts/search', asyncHandler(postController.searchOne));

//return all artworks
app.get('/api/artworks', asyncHandler(artworkController.getAllArtworks));


const server = app.listen(3001, '0.0.0.0', function () {
    const port = server.address().port;
    console.log('Listening at http://0.0.0.0:' + port +  `  Current time: ${new Date().toLocaleString()}` );
});

