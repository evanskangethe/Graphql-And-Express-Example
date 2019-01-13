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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user:{
      type: UserType,
      args: {id: {type:GraphQLInt}},
      resolve(parentValue,args){
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data)
      }
    },
    users:{
      type: new GraphQLList(UserType),
      resolve(parentValue,args){
        return axios.get(`http://localhost:3000/users`)
          .then(res => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
