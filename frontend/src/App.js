import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PokemonList from './components/ListOfPokemon/PokemonList';
import PokemonModal from './components/PokemonModal/PokemonModal';
import PokemonWordCloud from './components/PokemonWordCloud/PokemonWordCloud';
import Searchbar from './components/Searchbar/Searchbar';
import ContentSelector from './components/ContentSelector/ContentSelector';
import './App.css';
import Loadbutton from './components/Loadbutton/Loadbutton';

import { fetchPokemon } from './store/ducks/pokemonDuck';

function App() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);
  const types = useSelector(state => state.types);
  const search = useSelector(state => state.search);
  const sortInfo = useSelector(state => state.sortInfo);
  const showPokemon = useSelector(state => state.showPokemon);
  const modalInfo = useSelector(state => state.modalInfo);

  useEffect(() => {
    dispatch(
      fetchPokemon(0, types, search, sortInfo.sortBy, sortInfo.ascending)
    );
  }, [types, search, sortInfo]);

  return (
    <div className='App'>
      <div className='title'>
        <h1>Pokedex</h1>
      </div>
      <div className='searchbarContainer'>
        <Searchbar />
      </div>
      <div className='contentSelectorContainer'>
        <ContentSelector />
      </div>
      <div className='pokemonContentContainer'>
        {showPokemon ? <PokemonList /> : <PokemonWordCloud />}
      </div>
      <div className='loadbuttonContainer'>
        {pokemon.length % 25 === 0 && pokemon.length !== 0 && <Loadbutton />}
      </div>
      {modalInfo.show && <PokemonModal />}
    </div>
  );
}

export default App;
