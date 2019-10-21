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

  function generateBgColor(types) {
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
