import axios from 'axios';

// Actions
const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';
const CLEAR_POKEMON = 'CLEAR_POKEMON';
const UPDATE_VIEW = 'UPDATE_VIEW';

// Reducer
export default function pokemonReducer(state = [], action) {
  switch (action.type) {
    case FETCH_POKEMON_SUCCESS:
      return [...state, ...action.payload];
    case FETCH_POKEMON_FAILURE:
      throw Error(
        'Pokemon loading error, check if backend is connected properly'
      );
    case CLEAR_POKEMON:
      return [];
    case UPDATE_VIEW:
      const incrementView = view => view + 1;
      const newState = state.map(pokemon =>
        pokemon.id === action.payload
          ? { ...pokemon, views: incrementView(pokemon.views) }
          : { ...pokemon }
      );
      return newState;
    default:
      return state;
  }
}

// Action creators
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

export function fetchPokemon(
  skip = 0,
  types = [],
  search = '',
  sortParam = '',
  asc = true
) {
  const searchString = search ? `&name=${search}` : '';
  const sortString = sortParam ? `&sort=${sortParam}` : '';
  const orderString = asc ? '' : 'DESC';
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
          sortString +
          orderString}`
      )
      .then(response => dispatch(fetchPokemonSuccess(response)))
      .catch(err => dispatch(fetchPokemonFailure(err)));
}

export function clearPokemon() {
  return {
    type: 'CLEAR_POKEMON'
  };
}

export function updateView(id) {
  return {
    type: UPDATE_VIEW,
    payload: id
  };
}
