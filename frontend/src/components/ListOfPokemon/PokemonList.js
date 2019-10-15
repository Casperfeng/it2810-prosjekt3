import React, { useState } from 'react';
import './PokemonList.css';
import Pokemon from './Pokemon/Pokemon';

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([
    {
      name: 'Charmander',
      types: ['fire'],
      id: 1,
      pokemonId: 4
    },
    { name: 'Pikachu', types: ['electric'], id: 2, pokemonId: 25 }
  ]);

  function generatePokemon() {
    const pokemonItem = pokemon.map(pokemon => (
      <Pokemon
        key={pokemon.id}
        name={pokemon.name}
        types={pokemon.types}
        pokemonId={pokemon.pokemonId}
      />
    ));
    return pokemonItem;
  }
  return <div className='pokemonListContainer'>{generatePokemon()}</div>;
}
