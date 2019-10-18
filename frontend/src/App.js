import React from 'react';
import PokemonList from './components/ListOfPokemon/PokemonList';
import Searchbar from './components/Searchbar/Searchbar';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='searchbarContainer'>
        <Searchbar />
      </div>
      <div className='pokemonListContainer'>
        <PokemonList />
      </div>
    </div>
  );
}

export default App;
