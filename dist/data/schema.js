'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = '\ntype Type {\n  id: Int! # the ! means that every author object _must_ have an id\n  title: String\n  pokemons: [Pokemon] # the list of Posts by this author\n}\n\ntype Pokemon {\n  id: Int!\n  name: String\n  image: String\n  type: Type\n  votes: Int\n}\n\n# the schema allows the following query:\ntype Query {\n  pokemons: [Pokemon]\n}\n\n# this schema allows the following mutation:\ntype Mutation {\n  upvotePokemon (\n    pokemonId: Int!\n  ): Pokemon\n}\n\ntype Subscription {\n  pokemonUpvoted: Pokemon\n}\n\n';

exports.default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: schema,
  resolvers: _resolvers2.default
});