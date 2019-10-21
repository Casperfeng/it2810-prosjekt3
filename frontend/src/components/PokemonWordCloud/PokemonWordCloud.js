import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactWordcloud from 'react-wordcloud';

export default function PokemonList() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/pokemon/all');
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
        maxWords={151}
        size={[500, 500]}
        words={words}
      />
    </div>
  );
}
