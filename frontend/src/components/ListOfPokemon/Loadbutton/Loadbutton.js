import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon } from '../../../store/ducks/pokemonDuck';
import './Loadbutton.css';

export default function Loadbutton() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);
  const types = useSelector(state => state.types);
  const search = useSelector(state => state.search);
  return (
    <button
      className='loadbutton'
      onClick={() => dispatch(fetchPokemon(pokemon.length, types, search))}
    >
      Load more...
    </button>
  );
}
