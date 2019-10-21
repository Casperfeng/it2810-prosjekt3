import React from 'react';
import { useSelector } from 'react-redux';
import PokemonList from './components/ListOfPokemon/PokemonList';
import PokemonWordCloud from './components/PokemonWordCloud/PokemonWordCloud';
import PokemonModal from './components/PokemonModal/PokemonModal';
import Searchbar from './components/Searchbar/Searchbar';
import './App.css';

function App() {
  const showWordCloud = true;
  const modalInfo = useSelector(state => state.modalInfo);
  return (
    <div className='App'>
      <div className='title'>
        <h1>Pokedex</h1>
      </div>
      <div className='searchbarContainer'>
        <Searchbar />
      </div>
      <div className='pokemonListContainer'>
        {!showWordCloud ? <PokemonWordCloud /> : <PokemonList />}
      </div>
      {modalInfo.show && <PokemonModal />}
    </div>
  );
}

export default App;
