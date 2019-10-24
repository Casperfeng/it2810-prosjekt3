import React from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { updateSearch } from '../../store/ducks/searchDuck';
import Filterbutton from './Filterbutton/Filterbutton';
import './Searchbar.css';
import PokemonDropdown from './PokemonDropdown/PokemonDropdown';

export default function Searchbar() {
  const dispatch = useDispatch();
  const delayedQuery = _.debounce(q => dispatch(updateSearch(q)), 500);
  return (
    <div className='searchbarContentContainer'>
      <div className='searchbar'>
        <input
          className='searchbarInput'
          placeholder='Search pokemon names here...'
          onChange={e => delayedQuery(e.target.value)}
        />
        <div className='pokemonDropdownContainer'>
          <PokemonDropdown />
        </div>
      </div>
      <h6 className='filterText'>Filter by:</h6>
      <div className='filterbuttonContainer'>
        <Filterbutton text='poison' typeColor={'#C874C8'} />
        <Filterbutton text='grass' typeColor={'#A3DA89'} />
        <Filterbutton text='fire' typeColor={'#F08030'} />
        <Filterbutton text='psychic' typeColor={'#F73670'} />
        <Filterbutton text='normal' typeColor={'#9C9C63'} />
        <Filterbutton text='fighting' typeColor={'#AE2A24'} />
        <Filterbutton text='electric' typeColor={'#F6C910'} />
        <Filterbutton text='flying' typeColor={'#A990F0'} />
        <Filterbutton text='bug' typeColor={'#A8B820'} />
        <Filterbutton text='ground' typeColor={'#DBB54C'} />
        <Filterbutton text='ice' typeColor={'#7ECECE'} />
        <Filterbutton text='fairy' typeColor={'#E77890'} />
        <Filterbutton text='rock' typeColor={'#A48F31'} />
        <Filterbutton text='dragon' typeColor={'#5E1EF6'} />
        <Filterbutton text='water' typeColor={'#6790F0'} />
        <Filterbutton text='steel' typeColor={'grey'} />
        <Filterbutton text='ghost' typeColor={'#644D88'} />
      </div>
    </div>
  );
}
