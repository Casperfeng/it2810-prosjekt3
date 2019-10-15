import React from 'react';
import './Pokemon.css';

export default function Pokemon(props) {
  function parseUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  // finner ut hvilken farge som skal tilegnes bakgrunnen
  // @TODO: legg inn resterende typer
  function generateBgColor(types) {
    const colorFromType = {
      fire: '#F08030',
      grass: '#A3DA89',
      flying: '#A990F0',
      water: '#6790F0',
      bug: '#A8B820',
      ground: '#DBB54C',
      rock: '#A48F31',
      normal: '#9C9C63',
      poison: '#C874C8',
      dragon: '#5E1EF6',
      ice: '#7ECECE',
      fighting: '#AE2A24',
      electric: '#F6C910'
    };

    return types.length == 2
      ? colorFromType[types[0]] + ' ' + colorFromType[types[1]]
      : colorFromType[types[0]];
  }

  let bgColoring = generateBgColor(props.types);
  console.log(bgColoring);

  return (
    <div
      className='pokemonItemContainer'
      style={
        bgColoring.includes(' ')
          ? {
              background: `linear-gradient(90deg, ${
                bgColoring.split(' ')[0]
              } 50%, ${bgColoring.split(' ')[1]} 50%)`
            }
          : { background: bgColoring }
      }
    >
      <img className='pokemonSprite' src={parseUrl(props.pokemonId)} />
      <div className='pokemonName'>{props.name}</div>
    </div>
  );
}
