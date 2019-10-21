import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon } from '../../store/ducks/pokemonDuck';
import axios from 'axios';
import Pokemon from './Pokemon/Pokemon';
import './PokemonList.css';

function PokemonList() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);
  console.log(pokemon);

  useEffect(() => {
    dispatch(fetchPokemon());
  }, []);

  function sortPokemon() {
    pokemon.sort((pokemon1, pokemon2) => (pokemon1.id > pokemon2.id ? 1 : -1));
  }

  function generatePokemon() {
    const pokemonItem = pokemon.map(pokemon => (
      <Pokemon
        key={pokemon._id}
        name={pokemon.name}
        types={pokemon.types}
        pokemonId={pokemon.id}
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
