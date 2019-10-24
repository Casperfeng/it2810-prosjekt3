import React from 'react';
import { shallow } from 'enzyme';
import PokemonList from './PokemonList';
import Loadbutton from './Loadbutton/Loadbutton';

jest.mock('react-redux', () => ({
  useDispatch: () => {},
  useSelector: () => mockPokemon
}));

let mockPokemon;
let component;

test('Check if load more is shown when more pokemon exists ', () => {
  mockPokemon = new Array(25);
  component = shallow(<PokemonList />);
  expect(component.contains(<Loadbutton />)).toBeTruthy();
});

test('Check if load more is not shown when no more pokemon exists', () => {
  mockPokemon = new Array(151);
  component = shallow(<PokemonList />);
  expect(component.contains(<Loadbutton />)).toBe(false);
});
