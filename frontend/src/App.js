import React from 'react';
import { useSelector } from 'react-redux';
import PokemonList from './components/ListOfPokemon/PokemonList';
import PokemonModal from './components/PokemonModal/PokemonModal';
import PokemonWordCloud from './components/PokemonWordCloud/PokemonWordCloud';
import Searchbar from './components/Searchbar/Searchbar';
import ContentSelector from './components/ContentSelector/ContentSelector';
import './App.css';

function App() {
  const showPokemon = useSelector(state => state.showPokemon);
  const modalInfo = useSelector(state => state.modalInfo);
  return (
    <div className='App'>
      <div className='title'>
        <h1>Pokedex</h1>
      </div>
      <div className='searchbarContainer'>
        <Searchbar />
      </div>
      <div className='contentSelectorContainer'>
        <h2>Change content</h2>
        <ContentSelector />
      </div>
      <div className='pokemonContentContainer'>
        {showPokemon ? <PokemonList /> : <PokemonWordCloud />}
      </div>
      {modalInfo.show && <PokemonModal />}
    </div>
  );
}

export default App;
