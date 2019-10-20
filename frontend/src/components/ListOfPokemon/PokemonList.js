import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon/Pokemon';
import './PokemonList.css';

export default function PokemonList() {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/pokemon/');
      setPokemon(response.data);
    };
    fetchData();
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
