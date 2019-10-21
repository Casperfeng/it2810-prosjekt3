import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactWordcloud from 'react-wordcloud';
import { colorFromType } from '../../common/constants';

export default function PokemonList() {
  const [words, setWords] = useState([]);

  const [colorDict, setColorDict] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/pokemon/all');
      const newDict = {};
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

  function onWordClick() {
    return function(word) {
      console.log(word);
    };
  }

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
          },
          onWordClick: onWordClick()
        }}
        maxWords={151}
        size={[500, 500]}
        words={words}
      />
    </div>
  );
}
