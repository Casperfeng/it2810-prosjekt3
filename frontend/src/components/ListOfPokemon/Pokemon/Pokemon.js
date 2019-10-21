import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../store/ducks/modalDuck';
import './Pokemon.css';

export default function Pokemon(props) {
  const dispatch = useDispatch();
  const modalInfo = useSelector(state => state.modalInfo);
  console.log(modalInfo);
  function parseUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  // finner ut hvilken farge som skal tilegnes bakgrunnen
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
      electric: '#F6C910',
      psychic: '#F73670',
      fairy: '#E77890',
      ghost: '#644D88',
      steel: 'grey'
    };

    return types.length === 2
      ? colorFromType[types[0]] + ' ' + colorFromType[types[1]]
      : colorFromType[types[0]];
  }

  function hasTwoTypes(value) {
    return value.includes(' ');
  }

  function twoTypeColor(value) {
    if (!hasTwoTypes(value)) {
      throw Error('Something went wrong');
    }
    return {
      background: `linear-gradient(90deg, ${value.split(' ')[0]} 50%, ${
        value.split(' ')[1]
      } 50%)`
    };
  }

  function oneTypeColor(value) {
    if (hasTwoTypes(value)) {
      throw Error('Something went wrong');
    }

    return { background: value };
  }

  const bgColoring = generateBgColor(props.types);

  return (
    <>
      <div
        onClick={() =>
          dispatch(
            openModal({
              id: props.id,
              stats: props.stats,
              name: props.name,
              types: props.types,
              views: props.views
            })
          )
        }
        className='pokemonItemContainer'
        style={
          hasTwoTypes(bgColoring)
            ? twoTypeColor(bgColoring)
            : oneTypeColor(bgColoring)
        }
      >
        <img
          className='pokemonSprite'
          src={parseUrl(props.id)}
          alt={props.name}
        />
        <div className='pokemonName'>{props.name}</div>
      </div>
    </>
  );
}
