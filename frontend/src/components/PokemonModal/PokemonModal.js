import React, { useState } from 'react';
import './PokemonModal.css';
import PokemonStats from './PokemonStats/PokemonStats';
function PokemonModal(props) {
  const [show, setShow] = useState(true);
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
    electric: '#F6C910',
    psychic: '#F73670',
    fairy: '#E77890',
    ghost: '#644D88'
  };
  function formatedID() {
    const id = props.pokemon.id;
    let toReturn = '';
    if (id < 100) toReturn += '0';
    if (id < 10) toReturn += '0';
    return toReturn + id;
  }
  function type(index) {
    const types = props.pokemon.types;
    if (index >= types.length) return '';
    return types[index];
  }
  return (
    <div
      className='pokemonModal'
      style={{
        visibility: show ? 'visible' : 'collapse'
      }}
    >
      <div className='pokemon'>
        <div className='pokemonHeader'>
          <div className='viewsContainer'>
            <img
              className='viewsEye'
              src='assets/img/views_eye.png'
              alt='eye icon'
            ></img>
            <p className='viewsText'>{props.pokemon.views}</p>
          </div>
          <p className='pokemonText'>
            {props.pokemon.name}{' '}
            <span className='grayText'>#{formatedID()}</span>
          </p>
          <img
            className='modalCloseButton'
            src='assets/img/close_button.png'
            onClick={() => {
              setShow(!show);
            }}
            alt='close modal'
          ></img>
        </div>
        <img
          className='pokemonImage'
          src={
            'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
            formatedID() +
            '.png'
          }
          alt={props.pokemon.name}
        />
        <div className='pokemonStats'>
          <PokemonStats stats={props.pokemon.stats} />
        </div>
        <div className='pokemonTypesContainer'>
          <p className='pokemonTypeTitle'>Type</p>
          <div className='pokemonTypes'>
            <div
              className='pokemonType'
              style={{ background: colorFromType[type(0)] }}
            >
              <p className='pokemonTypeText'>{type(0)}</p>
            </div>
            <div
              className='pokemonType'
              style={{
                background: colorFromType[type(1)],
                height: type(1) === '' ? '0px' : '30px'
              }}
            >
              <p className='pokemonTypeText'>{type(1)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
