import React from 'react';
import FilterButton from './Filterbutton/Filterbutton';
import './Searchbar.css';

export default function Searchbar() {
  return (
    <div className='searchbarContentContainer'>
      <div className='searchbar'>
        <input placeholder='Search pokemon names here...' />
      </div>
      <h3>Filter by type:</h3>
      <div className='filterbuttonContainer'>
        <FilterButton text='Poison' typeColor={'#C874C8'} />
        <FilterButton text='Grass' typeColor={'#A3DA89'} />
        <FilterButton text='Fire' typeColor={'#F08030'} />
        <FilterButton text='Psychic' typeColor={'#F73670'} />
        <FilterButton text='Normal' typeColor={'#9C9C63'} />
        <FilterButton text='Fighting' typeColor={'#AE2A24'} />
        <FilterButton text='Electric' typeColor={'#F6C910'} />
        <FilterButton text='Flying' typeColor={'#A990F0'} />
        <FilterButton text='Bug' typeColor={'#A8B820'} />
        <FilterButton text='Ground' typeColor={'#DBB54C'} />
        <FilterButton text='Ice' typeColor={'#7ECECE'} />
        <FilterButton text='Fairy' typeColor={'#E77890'} />
        <FilterButton text='Rock' typeColor={'#A48F31'} />
        <FilterButton text='Dragon' typeColor={'#5E1EF6'} />
        <FilterButton text='Water' typeColor={'#6790F0'} />
        <FilterButton text='Steel' typeColor={'grey'} />
        <FilterButton text='Ghost' typeColor={'#644D88'} />
      </div>
    </div>
  );
}
