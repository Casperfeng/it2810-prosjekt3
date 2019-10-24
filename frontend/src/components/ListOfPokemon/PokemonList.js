import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPokemon,
  clearPokemon,
  updateView
} from '../../store/ducks/pokemonDuck';
import Pokemon from './Pokemon/Pokemon';
import Loadbutton from './Loadbutton/Loadbutton';
import './PokemonList.css';

function PokemonList() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);
  const types = useSelector(state => state.types);
  const search = useSelector(state => state.search);
  const sortInfo = useSelector(state => state.sortInfo);
  const modalInfo = useSelector(state => state.modalInfo);

  useEffect(() => {
    if (pokemon) {
      dispatch(clearPokemon());
    }
    dispatch(
      fetchPokemon(0, types, search, sortInfo.sortBy, sortInfo.ascending)
    );
  }, [types, search, sortInfo]);

  useEffect(() => {
    if (modalInfo) {
      dispatch(updateView(modalInfo.id));
    }
  }, [modalInfo]);

  function generatePokemon() {
    const pokemonItem = pokemon.map(pokemon => (
      <Pokemon
        key={pokemon._id}
        name={pokemon.name}
        types={pokemon.types}
        id={pokemon.id}
        stats={pokemon.stats}
        views={pokemon.views}
      />
    ));
    return pokemonItem;
  }

  return (
    <div>
      <div className='pokemonListContainer'>
        {pokemon.length !== 0 ? (
          generatePokemon()
        ) : (
          <h3>No pokemon matches the search criteria</h3>
        )}
      </div>
      <div className='loadbuttonContainer'>
        {pokemon.length % 25 === 0 && pokemon.length !== 0 && <Loadbutton />}
      </div>
    </div>
  );
}

export default PokemonList;
