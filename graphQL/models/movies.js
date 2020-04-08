const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    link: {
        type: String
    },
    movieId: {
        type: String
    },
    metascore: {
        type: Number
    },
    poster:{
        type: String
    },
    rating: {
        type : Number
    },
    synopsis:  {
        type: String
    },
    title: {
        type: String
    },
    votes: {
        type : Number
    },
    year: {
        type : Number
    }
});

const movies = mongoose.model('movies', movieSchema)

module.exports = movies;