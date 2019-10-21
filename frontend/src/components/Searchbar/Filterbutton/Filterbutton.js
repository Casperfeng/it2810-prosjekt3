import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateType } from '../../../store/ducks/typesDuck';
import './Filterbutton.css';

export default function Filterbutton(props) {
  const dispatch = useDispatch();
  const types = useSelector(state => state.types);
  let clicked = types.includes(props.text);
  return (
    <div>
      <button
        className={`filterButton ${clicked ? 'activeButton' : ''}`}
        style={{ backgroundColor: props.typeColor }}
        onClick={() => dispatch(updateType(props.text))}
      >
        {props.text}
      </button>
    </div>
  );
}
