import React from 'react';
import PokemonList from './components/ListOfPokemon/PokemonList';
import './App.css';

function App() {
  return (
    <div className='App'>
      Pokemon under:
      <PokemonList />
    </div>
  );
}

export default App;
