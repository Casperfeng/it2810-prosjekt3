import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateView } from '../../store/ducks/pokemonDuck';
import Pokemon from './Pokemon/Pokemon';
import './PokemonList.css';

function PokemonList() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);
  const modalInfo = useSelector(state => state.modalInfo);

  useEffect(() => {
    if (modalInfo) {
      dispatch(updateView(modalInfo.id));
    }
    // eslint-disable-next-line
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
    </div>
  );
}

export default PokemonList;
