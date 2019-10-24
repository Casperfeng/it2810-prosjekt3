import React from 'react';
import { shallow } from 'enzyme';
import PokemonStats from './PokemonStats';
import ProgressBar from 'react-bootstrap/ProgressBar';

let component;

beforeEach(() => {
  component = shallow(<PokemonStats stats={[45, 49, 49, 65, 65, 45]} />);
});

test('Check if PokemonStats creates stats headers correctly', () => {
  expect(
    component.contains(<p className='pokemonStatText'>HP</p>)
  ).toBeTruthy();
  expect(component.find('p').length).toBe(6);
});
test('Check if PokemonStats creates stats bars correctly', () => {
  expect(
    component.contains(
      <ProgressBar className='progressBar' label={45} now={(100 * 45) / 150} />
    )
  ).toBeTruthy();
  expect(component.find('ProgressBar').length).toBe(6);
});
