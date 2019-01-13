const express = require('express');
const graphql = require('graphql');
const expressGraphQL = require('express-graphql');
const app = express();
const http = require('http').Server(app);

//get the schema
const schema = require('./schema/schema');

//port
const PORT = process.env.PORT || 8080;

//add middleware
app.use('/graphql',expressGraphQL({
  graphiql:true,
  schema
}))

http.listen(PORT,()=>console.log(`Server listening at http://localhost:${PORT}`));
