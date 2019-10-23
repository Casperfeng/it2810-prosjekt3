import React from 'react';
import './PokemonStats.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
function PokemonStats(props) {
  function getStats(name, index) {
    return (
      <div className='pokemonStat'>
        <p className='pokemonStatText'>{name}</p>
        <ProgressBar
          className='progressBar'
          label={props.stats[index]}
          now={(100 * props.stats[index]) / 150}
        />
      </div>
    );
  }
  return (
    <div className='pokemonStatsContainer'>
      {getStats('HP', 0)}
      {getStats('Attack', 1)}
      {getStats('Defence', 2)}
      {getStats('Sp. Atk', 3)}
      {getStats('Sp. Def', 4)}
      {getStats('Speed', 5)}
    </div>
  );
}

export default PokemonStats;
