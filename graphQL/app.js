const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemas/schema')
require('./database/db');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(9292, () => {
    console.log('GraphQl Server is up and running on port 9292')
})