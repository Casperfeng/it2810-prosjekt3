import React from 'react';
import { shallow } from 'enzyme';
import PokemonModal from './PokemonModal';

jest.mock('react-redux', () => ({
  useDispatch: () => {},
  useSelector: () => ({
    id: 1,
    name: 'bulbasaur',
    types: ['grass', 'poison'],
    stats: [45, 49, 49, 65, 65, 45],
    views: 10
  })
}));

let component;
beforeEach(() => {
  component = shallow(<PokemonModal />);
});

test('Check if pokemon title is generated correctly', () => {
  let component = shallow(<PokemonModal />);
  expect(
    component.contains(
      <p className='pokemonText'>
        bulbasaur <span className='grayText'>#001</span>
      </p>
    )
  ).toBeTruthy();
});

test('Check if type header is generated correctly', () => {
  expect(
    component.contains(<p className='pokemonTypeText'>grass</p>)
  ).toBeTruthy();
});

test('Check if type 2 header is visible', () => {
  expect(
    component.contains(
      <div
        className='pokemonType'
        style={{
          background: '#C874C8',
          height: '30px'
        }}
      >
        <p className='pokemonTypeText'>poison</p>
      </div>
    )
  ).toBeTruthy();
});
