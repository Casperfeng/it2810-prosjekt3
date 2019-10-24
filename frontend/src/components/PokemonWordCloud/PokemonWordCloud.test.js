import React from 'react';
import { shallow } from 'enzyme';
import PokemonWordCloud from './PokemonWordCloud';

jest.mock('react-redux', () => ({
  useDispatch: () => {},
  useSelector: () => mockPokemon
}));
let mockPokemon;
let component;

test('Check if pokemon are generated in wordcloud when pokemon is not empty', () => {
  mockPokemon = [
    {
      id: 1,
      name: 'bulbasaur',
      types: ['grass', 'poison'],
      stats: [45, 49, 49, 65, 65, 45],
      views: 10
    },
    {
      id: 2,
      name: 'ivysaur',
      types: ['grass', 'poison'],
      stats: [45, 49, 49, 65, 65, 45],
      views: 10
    }
  ];
  component = shallow(<PokemonWordCloud />);
  expect(component.find('text')).toBeTruthy();
});

test('Check if pokemons are not generated in wordcloud when pokemon is empty', () => {
  mockPokemon = [];
  component = shallow(<PokemonWordCloud />);
  expect(component.contains('bulbasaur')).toBe(false);
  expect(component.contains('ivysaur')).toBe(false);
});
