const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
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

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        id:{type: new GraphQLNonNull(GraphQLInt)},
        first_name:{type: new GraphQLNonNull(GraphQLString)},
        last_name:{type: new GraphQLNonNull(GraphQLString)},
        email:{type: new GraphQLNonNull(GraphQLString)},
        gender:{type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue,args){
        return axios.post(`http://localhost:3000/users`,{
          id:args.id,
          first_name: args.first_name,
          last_name:args.last_name,
          email:args.email,
          gender:args.gender
        })
        .then(res => res.data)
      }
    },
    deleteUser:{
      type: UserType,
      args:{
        id:{type:new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue,args){
        return axios.delete(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data)
      }
    },
    editUser:{
      type: UserType,
      args:{
        id:{type:new GraphQLNonNull(GraphQLInt)},
        first_name:{type: GraphQLString},
        last_name:{type: GraphQLString},
        email:{type: GraphQLString},
        gender:{type: GraphQLString}
      },
      resolve(parentValue,args){
        return axios.patch(`http://localhost:3000/users/${args.id}`,args)
        .then(res => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})
