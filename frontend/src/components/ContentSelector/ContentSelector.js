import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPokemon, selectWordCloud } from '../../store/ducks/contentDuck';
import './ContentSelector.css';

export default function ContentSelector() {
  const dispatch = useDispatch();
  const showPokemon = useSelector(state => state.showPokemon);
  return (
    <div className='contentSelectorButtons'>
      <button
        className={`contentSelector ${showPokemon ? 'selectedContent' : ''}`}
        onClick={() => dispatch(selectPokemon())}
      >
        Show pokemon
      </button>
      <button
        className={`contentSelector ${!showPokemon ? 'selectedContent' : ''}`}
        onClick={() => dispatch(selectWordCloud())}
      >
        Show word cloud
      </button>
    </div>
  );
}
