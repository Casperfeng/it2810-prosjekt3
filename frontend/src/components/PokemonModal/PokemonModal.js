import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/ducks/modalDuck';
import { colorFromType } from '../../common/constants';
import './PokemonModal.css';
import PokemonStats from './PokemonStats/PokemonStats';

function PokemonModal() {
  const dispatch = useDispatch();
  const modalInfo = useSelector(state => state.modalInfo);

  /**
   * Returns the id formatted as three digits.
   */
  function formattedID() {
    const id = modalInfo.id;
    let toReturn = '';
    if (id < 100) toReturn += '0';
    if (id < 10) toReturn += '0';
    return toReturn + id;
  }

  /**
   * * Returns the type with the corresponding index. If no type exists, return an empty string;
   */
  function type(index) {
    return index < modalInfo.types.length ? modalInfo.types[index] : '';
  }

  return (
    <div className='pokemonModal'>
      <div className='pokemon'>
        <div className='pokemonHeader'>
          <div className='viewsContainer'>
            <img
              className='viewsEye'
              src='assets/img/views_eye.png'
              alt='eye icon'
            ></img>
            <p className='viewsText'>{modalInfo.views}</p>
          </div>
          <p className='pokemonText'>
            {modalInfo.name} <span className='grayText'>#{formattedID()}</span>
          </p>
          <img
            className='modalCloseButton'
            src='assets/img/close_button.png'
            onClick={() => dispatch(closeModal())}
            alt='close modal'
          ></img>
        </div>
        <img
          className='pokemonImage'
          src={
            'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
            formattedID() +
            '.png'
          }
          alt={modalInfo.name}
        />
        <div className='pokemonStats'>
          <PokemonStats stats={modalInfo.stats} />
        </div>
        <div className='pokemonTypesContainer'>
          <p className='pokemonTypeTitle'>Type</p>
          <div className='pokemonTypes'>
            <div
              className='pokemonType'
              style={{ background: colorFromType[type(0)] }}
            >
              <p className='pokemonTypeText'>{type(0)}</p>
            </div>
            <div
              className='pokemonType'
              style={{
                background: colorFromType[type(1)],
                height: type(1) === '' ? '0px' : '30px'
              }}
            >
              <p className='pokemonTypeText'>{type(1)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
