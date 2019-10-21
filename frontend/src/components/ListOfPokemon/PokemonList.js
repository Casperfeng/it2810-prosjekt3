import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon, clearPokemon } from '../../store/ducks/pokemonDuck';
import Pokemon from './Pokemon/Pokemon';
import Loadbutton from './Loadbutton/Loadbutton';
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
    <div>
      <div className='pokemonListContainer'>
        {pokemon.length !== 0 ? (
          generatePokemon()
        ) : (
          <h3>No pokemon found matching search criterias</h3>
        )}
      </div>
      <div className='loadbuttonContainer'>
        {pokemon.length % 25 === 0 && <Loadbutton />}
      </div>
    </div>
  );
}

export default PokemonList;
