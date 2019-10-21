import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon, clearPokemon } from '../../store/ducks/pokemonDuck';
import Pokemon from './Pokemon/Pokemon';
import './PokemonList.css';

function PokemonList() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);
  const types = useSelector(state => state.types);
  const search = useSelector(state => state.search);

  useEffect(() => {
    if (pokemon) {
      dispatch(clearPokemon());
    }
    dispatch(fetchPokemon(0, types, search));
  }, [types, search]);

  function sortPokemon() {
    pokemon.sort((pokemon1, pokemon2) => (pokemon1.id > pokemon2.id ? 1 : -1));
  }

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
  if (pokemon) {
    if (pokemon.length > 2) {
      sortPokemon();
    }
  }

  return (
    <div className='pokemonListContainer'>
      {pokemon ? generatePokemon() : <h3>No pokemon found</h3>}
    </div>
  );
}

export default PokemonList;
