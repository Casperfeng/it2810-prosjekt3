import axios from 'axios';

const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';
const LOAD_POKEMON = 'LOAD_POKEMON';
// Reducer
export default function pokemonReducer(state = [], action) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_POKEMON_SUCCESS:
      return [...state, ...action.payload];
    case FETCH_POKEMON_FAILURE:
      throw Error('Pokemon loading error');
    default:
      return state;
  }
}

export function fetchPokemonSuccess(response) {
  return {
    type: FETCH_POKEMON_SUCCESS,
    payload: response.data
  };
}

export function fetchPokemonFailure() {
  return {
    type: FETCH_POKEMON_FAILURE
  };
}

// Action creator
export function fetchPokemon() {
  return dispatch =>
    axios
      .get(`http://localhost:5000/pokemon/`)
      .then(response => dispatch(fetchPokemonSuccess(response)))
      .catch(err => dispatch(fetchPokemonFailure(err)));
}
