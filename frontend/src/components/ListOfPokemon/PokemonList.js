import React, { useState } from 'react';
import './PokemonList.css';
import Pokemon from './Pokemon/Pokemon';

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([
    { name: 'Venusaur', types: ['grass', 'poison'], id: 2, pokemonId: 3 },
    {
      name: 'Charizard',
      types: ['fire', 'flying'],
      id: 4,
      pokemonId: 6
    },
    {
      name: 'Ekans',
      types: ['poison'],
      id: 1,
      pokemonId: 23
    },
    { name: 'Mewtwo', types: ['psychic'], id: 6, pokemonId: 150 },
    { name: 'Blastoise', types: ['water'], id: 8, pokemonId: 9 }
  ]);

  function sortPokemon() {
    pokemon.sort((pokemon1, pokemon2) =>
      pokemon1.pokemonId > pokemon2.pokemonId ? 1 : -1
    );
  }

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

  sortPokemon();
  return <div className='pokemonListContainer'>{generatePokemon()}</div>;
}
