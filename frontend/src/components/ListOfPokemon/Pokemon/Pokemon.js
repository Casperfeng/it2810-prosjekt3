import React from 'react';
import './Pokemon.css';

export default function Pokemon(props) {
  function parseUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  function generateBgColor(types) {
    let result = '';
    const colorFromType = {
      fire: '#F08030',
      grass: '#A3DA89',
      flying: '#A990F0',
      water: '#6790F0',
      bug: '#A8B820',
      ground: '#DBB54C',
      rock: '#A48F31',
      normal: '#9C9C63'
    };
    console.log(types);
    return result;
  }

  return (
    <div className={`pokemonItemContainer ${generateBgColor(props.types)}`}>
      <img className='pokemonSprite' src={parseUrl(props.pokemonId)} />
      <div className='pokemonName'>{props.name}</div>
    </div>
  );
}
