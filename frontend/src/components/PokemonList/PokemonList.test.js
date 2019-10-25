import React from 'react';
import { shallow } from 'enzyme';
import PokemonList from './PokemonList';
import Pokemon from './Pokemon/Pokemon';

jest.mock('react-redux', () => ({
  useDispatch: () => {},
  useSelector: () => mockPokemon
}));

let mockPokemon;
let component;

test('Check if pokemon is correctly generated', () => {
  mockPokemon = [
    {
      _id: 123,
      id: 1,
      name: 'bulbasaur',
      types: ['grass', 'poison'],
      stats: [45, 49, 49, 65, 65, 45],
      views: 10
    }
  ];
  component = shallow(<PokemonList />);
  expect(
    component.contains(
      <Pokemon
        key={123}
        name={'bulbasaur'}
        types={['grass', 'poison']}
        id={1}
        stats={[45, 49, 49, 65, 65, 45]}
        views={10}
      />
    )
  ).toBe(true);
});

test('Check if load more is shown when more pokemon exists ', () => {
  mockPokemon = [];
  component = shallow(<PokemonList />);
  expect(
    component.contains(
      <Pokemon
        name={'bulbasaur'}
        types={['grass', 'poison']}
        id={1}
        stats={[45, 49, 49, 65, 65, 45]}
        views={10}
      />
    )
  ).toBe(false);
});
