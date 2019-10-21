import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactWordcloud from 'react-wordcloud';

export default function PokemonList() {
  const [words, setWords] = useState([]);

  const [colorDict, setColorDict] = useState({});

  const colorFromType = {
    fire: '#F08030',
    grass: '#A3DA89',
    flying: '#A990F0',
    water: '#6790F0',
    bug: '#A8B820',
    ground: '#DBB54C',
    rock: '#A48F31',
    normal: '#9C9C63',
    poison: '#C874C8',
    dragon: '#5E1EF6',
    ice: '#7ECECE',
    fighting: '#AE2A24',
    electric: '#F6C910',
    psychic: '#F73670',
    fairy: '#E77890',
    ghost: '#644D88'
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/pokemon/all');
      let newDict = {};
      for (let x = 0; x < response.data.length; x++)
        newDict[response.data[x].name] =
          colorFromType[response.data[x].types[0]];
      setColorDict(newDict);
      setWords(
        response.data.map(pokemon => {
          return {
            text: pokemon.name,
            value: pokemon.views
          };
        })
      );
    };
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#EEEEEE' }}>
      <ReactWordcloud
        options={{
          fontSizes: [15, 80]
        }}
        callbacks={{
          getWordColor: ({ text }) => {
            return colorDict[text];
          },
          getWordTooltip: ({ text, value }) => {
            return text + ' (views: ' + value + ')';
          }
        }}
        maxWords={151}
        size={[500, 500]}
        words={words}
      />
    </div>
  );
}
