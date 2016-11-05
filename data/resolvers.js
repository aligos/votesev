import { find, filter } from 'lodash';
import { pubsub } from './subscriptions';

const types = [
  { id: 1, title: 'Water' },
  { id: 2, title: 'Electric' },
];

const pokemons = [
  { id: 1, typeId: 1, name: 'Squirtle', image: 'https://img.pokemondb.net/artwork/squirtle.jpg', votes: 2 },
  { id: 2, typeId: 2, name: 'Pikachu', image: 'https://img.pokemondb.net/artwork/pikachu.jpg', votes: 3 },
  { id: 3, typeId: 2, name: 'Raichu', image: 'https://img.pokemondb.net/artwork/raichu.jpg', votes: 1 },
];

const resolveFunctions = {
  Query: {
    pokemons() {
      return pokemons;
    },
  },
  Mutation: {
    upvotePokemon(_, { pokemonId }) {
      const pokemon = find(pokemons, { id: pokemonId });
      if (!pokemon) {
        throw new Error(`Couldn't find post with id ${pokemonId}`);
      }
      pokemon.votes += 1;
      pubsub.publish('pokemonUpvoted', pokemon);
      return pokemon;
    },
  },
  Subscription: {
    pokemonUpvoted(pokemon) {
      return pokemon;
    },
  },
  Type: {
    pokemons(type) {
      return filter(pokemons, { typeId: type.id });
    },
  },
  Pokemon: {
    type(pokemon) {
      return find(types, { id: pokemon.typeId });
    },
  },
};

export default resolveFunctions;
