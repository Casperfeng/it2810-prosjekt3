import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPokemon, selectWordCloud } from '../../store/ducks/contentDuck';
import './ContentSelector.css';

export default function ContentSelector() {
  const dispatch = useDispatch();
  const showPokemon = useSelector(state => state.showPokemon);
  const pokemonBtn = () => {
    return (
      <button
        className={'contentSelector'}
        onClick={() => dispatch(selectPokemon())}
      >
        Show pokemon
      </button>
    );
  };
  const wordcloudBtn = () => {
    return (
      <button
        className={'contentSelector'}
        onClick={() => dispatch(selectWordCloud())}
      >
        Show word cloud
      </button>
    );
  };
  return (
    <div className='contentSelectorButtons'>
      {showPokemon ? wordcloudBtn() : pokemonBtn()}
    </div>
  );
}
