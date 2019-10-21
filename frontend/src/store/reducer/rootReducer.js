import { combineReducers } from 'redux';
import pokemonDuck from '../ducks/pokemonDuck';

const rootReducer = combineReducers({
  pokemon: pokemonDuck
});

export default rootReducer;
