import axios from 'axios';

// Actions
const FETCH_ALL_POKEMON_SUCCESS = 'FETCH_ALL_POKEMON_SUCCESS';
const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';
const CLEAR_POKEMON = 'CLEAR_POKEMON';

// Reducer
export default function pokemonReducer(state = [], action) {
  switch (action.type) {
    case FETCH_POKEMON_SUCCESS:
      return [...state, ...action.payload];
    case FETCH_ALL_POKEMON_SUCCESS:
      return [...action.payload];
    case FETCH_POKEMON_FAILURE:
      throw Error(
        'Pokemon loading error, check if backend is connected properly'
      );
    case CLEAR_POKEMON:
      return [];
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

export function fetchAllPokemonSuccess(response) {
  return {
    type: FETCH_ALL_POKEMON_SUCCESS,
    payload: response.data
  };
}

export function fetchPokemonFailure() {
  return {
    type: FETCH_POKEMON_FAILURE
  };
}

// Action creator
export function fetchPokemon(skip = 0, types = [], search = '') {
  const searchString = search ? `&name=${search}` : '';
  let typesString = '';
  for (let i = 0; i < types.length; i++) {
    typesString += `&type${i === 0 ? '' : i}=${types[i]}`;
  }
  return dispatch =>
    axios
      .get(
        `http://localhost:5000/pokemon/?skip=${skip +
          typesString +
          searchString}`
      )
      .then(response => dispatch(fetchPokemonSuccess(response)))
      .catch(err => dispatch(fetchPokemonFailure(err)));
}

export function fetchAllPokemon(
  types = [],
  search = '',
  limit = 'none',
  skip = 0
) {
  const searchString = search ? `&name=${search}` : '';
  const limitString = limit ? `&limit=${limit}` : '';
  let typesString = '';
  for (let i = 0; i < types.length; i++) {
    typesString += `&type${i === 0 ? '' : i}=${types[i]}`;
  }
  return dispatch =>
    axios
      .get(
        `http://localhost:5000/pokemon/?skip=${skip +
          typesString +
          searchString +
          limitString}`
      )
      .then(response => dispatch(fetchAllPokemonSuccess(response)))
      .catch(err => dispatch(fetchPokemonFailure(err)));
}

export function clearPokemon() {
  return {
    type: 'CLEAR_POKEMON'
  };
}
