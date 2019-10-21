import { combineReducers } from 'redux';
import pokemonDuck from '../ducks/pokemonDuck';
import typesDuck from '../ducks/typesDuck';

// Using the ducks module pattern for Redux

const rootReducer = combineReducers({
  pokemon: pokemonDuck,
  types: typesDuck
});

export default rootReducer;
