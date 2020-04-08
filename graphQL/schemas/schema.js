const graphql = require('graphql');
const movies = require('../models/movies');

const { GraphQLObjectType,
     GraphQLSchema, 
     GraphQLString, 
     GraphQLList,
      GraphQLInt,
      GraphQLID ,
      GraphQLFloat} = graphql;

const MovieType = new GraphQLObjectType({
    name: "movie",
    fields: () =>({
        link: { type: GraphQLString},
        movieId: { type: GraphQLString},
        metascore: {type: GraphQLInt},
        poster: {type: GraphQLString},
        rating: {type: GraphQLFloat},
        synopsis: {type: GraphQLString},
        title: {type: GraphQLString},
        votes: {type: GraphQLFloat},
        year: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        movie: {
            type: MovieType,
            args: {movieId: { type: GraphQLString}},
            resolve(parent, args){
                return movies.findOne({movieId: args.movieId})
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return movies.find({});
            }
        },
        movie_by_title:{
            type: MovieType,
            args: {
                title: {type: GraphQLString}
            },
            resolve(parent, args) {
                return movies.findOne({title: args.title})
            }
        },
        must_watch: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies.find({}).where('metascore').gt('70');
            }
        },
        movie_search: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies.find({}).where('metascore').equals('0').limit(3);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'mutation',
    fields : {
        addMovie:{
                type: MovieType,
                args: {
                link: { type: GraphQLString},
                movieId: { type: GraphQLString},
                metascore: {type: GraphQLInt},
                poster: {type: GraphQLString},
                rating: {type: GraphQLFloat},
                synopsis: {type: GraphQLString},
                title: {type: GraphQLString},
                votes: {type: GraphQLFloat},
                year: {type: GraphQLInt}
            },
            resolve(parent, args){
                let newMovie = new movies ({
                    link: args.link,
                    movieId: args.movieId,
                    metascore: args.metascore,
                    poster: args.poster,
                    rating: args.rating,
                    synopsis: args.synopsis,
                    title: args.title,
                    votes: args.votes,
                    year: args.year
                })
                return newMovie.save();
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query: RootQuery,
    mutation: Mutation
})
