const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id:{type:GraphQLInt},
    first_name:{type: GraphQLString},
    last_name:{type:GraphQLString},
    email:{type:GraphQLString},
    gender:{type:GraphQLString}
  })
})
