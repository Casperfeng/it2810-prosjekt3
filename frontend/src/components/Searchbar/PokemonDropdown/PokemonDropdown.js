import React from 'react';
import { useDispatch } from 'react-redux';
import { fireAction } from '../../../store/ducks/sortDuck';
import './PokemonDropdown.css';

export default function PokemonDropdown() {
  const dispatch = useDispatch();

  function handleOptionSelect(optionValue) {
    const optionArray = optionValue.split(' ');
    optionArray[1] = optionArray.includes('asc');
    dispatch(fireAction(optionArray[0], optionArray[1]));
  }

  return (
    <div>
      <select
        className='pokemonDropdown'
        onChange={e => handleOptionSelect(e.target.value)}
      >
        <option value='id asc'>Lowest to highest id</option>
        <option value='id desc'>Highest to lowest id</option>
        <option value='name asc'>A to Z</option>
        <option value='name desc'>Z to A</option>
        <option value='views asc'>Least popular</option>
        <option value='views desc'>Most popular</option>
      </select>
    </div>
  );
}
