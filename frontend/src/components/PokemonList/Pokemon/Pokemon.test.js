import React from 'react';
import { shallow } from 'enzyme';
import Pokemon from './Pokemon';

jest.mock('react-redux', () => ({
  useDispatch: () => {}
}));

let component;
beforeEach(() => {
  component = shallow(
    <Pokemon
      id={1}
      name={'bulbasaur'}
      types={['grass', 'poison']}
      stats={[45, 49, 49, 65, 65, 45]}
      views={10}
    />
  );
});

test('Check if image is properly generated', () => {
  expect(
    component.contains(
      <img
        className='pokemonSprite'
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        alt='bulbasaur'
      />
    )
  ).toBeTruthy();
});

test('Check if name is properly generated', () => {
  expect(
    component.contains(<div className='pokemonName'>bulbasaur</div>)
  ).toBeTruthy();
});
