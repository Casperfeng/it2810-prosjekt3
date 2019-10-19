import React, { useState } from 'react';
import './Filterbutton.css';

export default function Filterbutton(props) {
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      <button
        className={`filterButton ${clicked ? 'activeButton' : ''}`}
        style={{ backgroundColor: props.typeColor }}
        onClick={() => setClicked(!clicked)}
      >
        {props.text}
      </button>
    </div>
  );
}
