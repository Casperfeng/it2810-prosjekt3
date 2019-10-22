import { combineReducers } from 'redux';
import pokemonDuck from '../ducks/pokemonDuck';
import typesDuck from '../ducks/typesDuck';
import searchReducer from '../ducks/searchDuck';
import modalReducer from '../ducks/modalDuck';
import contentDuck from '../ducks/contentDuck';

// Using the ducks module pattern for Redux

const rootReducer = combineReducers({
  pokemon: pokemonDuck,
  types: typesDuck,
  search: searchReducer,
  modalInfo: modalReducer,
  showPokemon: contentDuck
});

export default rootReducer;