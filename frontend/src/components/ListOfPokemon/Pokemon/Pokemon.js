import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/ducks/modalDuck';
import { colorFromType } from '../../../common/constants';
import './Pokemon.css';

export default function Pokemon(props) {
  const dispatch = useDispatch();

  function parseUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  function oneTypeColor(types) {
    const color = colorFromType[types[0]];
    return { background: color };
  }

  function twoTypeColor(types) {
    const color1 = colorFromType[types[0]];
    const color2 = colorFromType[types[1]];
    return {
      background: `linear-gradient(90deg, ${color1} 50%, ${color2} 50%)`
    };
  }

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
          props.types.length === 1
            ? oneTypeColor(props.types)
            : twoTypeColor(props.types)
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
