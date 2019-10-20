import axios from 'axios';

export const fetchPokemon = (skip = 0, types = []) => async dispatch => {
  let typesString = '';
  for (let i = 0; i < types.length; i++) {
    typesString += `&type=${i === 0 ? '' : i}${types[i]}`;
  }
  const reponse = await axios.get(
    `http://localhost:5000/pokemon/?skip=${skip}${typesString}`
  );
  dispatch({ type: 'FETCH_POKEMON', payload: response.data });
};
