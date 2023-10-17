const Artwork = require('../models/artwork');

module.exports = {
    // Get all artworks
    getAllArtworks: async (req, res) => {
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

        res.status(200).send({ backgrounds: paths, artworks: transformedArtworks });
    },

}