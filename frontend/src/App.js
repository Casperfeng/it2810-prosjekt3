import React from 'react';
import PokemonList from './components/ListOfPokemon/PokemonList';
import PokemonWordCloud from './components/PokemonWordCloud/PokemonWordCloud';
import Searchbar from './components/Searchbar/Searchbar';
import './App.css';
import PokemonModal from './components/PokemonModal/PokemonModal';

function App() {
  const showWordCloud = true;
  return (
    <div className='App'>
      <div className='title'>
        <h1>Pokedex</h1>
      </div>
      <div className='searchbarContainer'>
        <Searchbar />
      </div>
      <div className='pokemonListContainer'>
        {showWordCloud ? <PokemonWordCloud /> : <PokemonList />}
      </div>
      <PokemonModal
        pokemon={{
          id: 113,
          name: 'chansey',
          types: ['normal'],
          stats: [250, 5, 5, 35, 105, 50],
          views: 10
        }}
      />
    </div>
  );
}

export default App;
