import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon, clearPokemon } from '../../store/ducks/pokemonDuck';
import Pokemon from './Pokemon/Pokemon';
import Loadbutton from './Loadbutton/Loadbutton';
import PokemonDropdown from './PokemonDropdown/PokemonDropdown';
import './PokemonList.css';

function PokemonList() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);
  const types = useSelector(state => state.types);
  const search = useSelector(state => state.search);
  const sortInfo = useSelector(state => state.sortInfo);

  useEffect(() => {
    if (pokemon) {
      dispatch(clearPokemon());
    }
    dispatch(
      fetchPokemon(0, types, search, sortInfo.sortBy, sortInfo.ascending)
    );
  }, [types, search, sortInfo]);

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
    <div className='dropDownListContainer'>
      <h2>Sort by:</h2>
      <PokemonDropdown />
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
