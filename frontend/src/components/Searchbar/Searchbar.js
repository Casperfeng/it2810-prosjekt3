import React from 'react';
import Filterbutton from './Filterbutton/Filterbutton';
import Searchbutton from './Searchbutton/Searchbutton';
import './Searchbar.css';

export default function Searchbar() {
  return (
    <div className='searchbarContentContainer'>
      <div className='searchbar'>
        <div>
          <input placeholder='Search pokemon names here...' />
        </div>
        <Searchbutton />
      </div>
      <h3>Filter by type:</h3>
      <div className='filterbuttonContainer'>
        <Filterbutton text='Poison' typeColor={'#C874C8'} />
        <Filterbutton text='Grass' typeColor={'#A3DA89'} />
        <Filterbutton text='Fire' typeColor={'#F08030'} />
        <Filterbutton text='Psychic' typeColor={'#F73670'} />
        <Filterbutton text='Normal' typeColor={'#9C9C63'} />
        <Filterbutton text='Fighting' typeColor={'#AE2A24'} />
        <Filterbutton text='Electric' typeColor={'#F6C910'} />
        <Filterbutton text='Flying' typeColor={'#A990F0'} />
        <Filterbutton text='Bug' typeColor={'#A8B820'} />
        <Filterbutton text='Ground' typeColor={'#DBB54C'} />
        <Filterbutton text='Ice' typeColor={'#7ECECE'} />
        <Filterbutton text='Fairy' typeColor={'#E77890'} />
        <Filterbutton text='Rock' typeColor={'#A48F31'} />
        <Filterbutton text='Dragon' typeColor={'#5E1EF6'} />
        <Filterbutton text='Water' typeColor={'#6790F0'} />
        <Filterbutton text='Steel' typeColor={'grey'} />
        <Filterbutton text='Ghost' typeColor={'#644D88'} />
      </div>
    </div>
  );
}
