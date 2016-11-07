const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require('./resolvers');

const schema = `
type Type {
  id: Int! # the ! means that every author object _must_ have an id
  title: String
  pokemons: [Pokemon] # the list of Posts by this author
}

type Pokemon {
  id: Int!
  name: String
  image: String
  type: Type
  votes: Int
}

# the schema allows the following query:
type Query {
  pokemons: [Pokemon]
}

# this schema allows the following mutation:
type Mutation {
  upvotePokemon (
    pokemonId: Int!
  ): Pokemon
}

type Subscription {
  pokemonUpvoted: Pokemon
}

`;

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
