'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _subscriptions = require('./subscriptions');

var types = [{ id: 1, title: 'Water' }, { id: 2, title: 'Electric' }];

var _pokemons = [{ id: 1, typeId: 1, name: 'Squirtle', image: 'https://img.pokemondb.net/artwork/squirtle.jpg', votes: 2 }, { id: 2, typeId: 2, name: 'Pikachu', image: 'https://img.pokemondb.net/artwork/pikachu.jpg', votes: 3 }, { id: 3, typeId: 2, name: 'Raichu', image: 'https://img.pokemondb.net/artwork/raichu.jpg', votes: 1 }];

var resolveFunctions = {
  Query: {
    pokemons: function pokemons() {
      return _pokemons;
    }
  },
  Mutation: {
    upvotePokemon: function upvotePokemon(_, _ref) {
      var pokemonId = _ref.pokemonId;

      var pokemon = (0, _lodash.find)(_pokemons, { id: pokemonId });
      if (!pokemon) {
        throw new Error('Couldn\'t find post with id ' + pokemonId);
      }
      pokemon.votes += 1;
      _subscriptions.pubsub.publish('pokemonUpvoted', pokemon);
      return pokemon;
    }
  },
  Subscription: {
    pokemonUpvoted: function pokemonUpvoted(pokemon) {
      return pokemon;
    }
  },
  Type: {
    pokemons: function pokemons(type) {
      return (0, _lodash.filter)(_pokemons, { typeId: type.id });
    }
  },
  Pokemon: {
    type: function type(pokemon) {
      return (0, _lodash.find)(types, { id: pokemon.typeId });
    }
  }
};

exports.default = resolveFunctions;