import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import PokemonList from './components/ListOfPokemon/PokemonList';
import PokemonModal from './components/PokemonModal/PokemonModal';

jest.mock('react-redux', () => ({
  useDispatch: () => {},
  useSelector: () => mockData
}));
let mockData;
let component;
test('Check if pokemonList is hidden correctly', () => {
  mockData = true; //mocks (state => state.showPokemon)
  component = shallow(<App />);
  expect(component.contains(<PokemonList />)).toBe(true);
  mockData = false;
  component = shallow(<App />);
  expect(component.contains(<PokemonList />)).toBe(false);
});

test('Check if pokemonModal is hidden correctly', () => {
  mockData = { show: true }; //mocks (state => state.modalInfo)
  component = shallow(<App />);
  expect(component.contains(<PokemonModal />)).toBe(true);
  mockData = { show: false };
  component = shallow(<App />);
  expect(component.contains(<PokemonModal />)).toBe(false);
});
