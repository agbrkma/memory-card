import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/card';

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0)

  const getRandomPokemonId = () => Math.floor(Math.random() * 151) + 1;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemonData = [];

        for (let i = 0; i < 10; i++) {
          const randomId = getRandomPokemonId();
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
          const data = await response.json();

          // Ensure valid data
          if (data && data.sprites && data.sprites.front_default) {
            pokemonData.push({
              id: data.id,
              name: data.name, 
              imageUrl: data.sprites.front_default 
            });
          } else {
            console.error('Invalid Pokémon data:', data);
          }
        }

        setPokemon(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  console.log(pokemon)

  const shufflePokemon = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handlePokemonClick = (id) => {
    if (clickedPokemon.includes(id)) {
      setScore(0);
      setClickedPokemon([]);
    } else {

      const newScore = score + 1;
      setScore(newScore);
      setClickedPokemon([...clickedPokemon, id]);


      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }

    setPokemon(shufflePokemon([...pokemon]));
  };

  return (
    <div className="App">
      <h1>Pokémon Memory Game</h1>
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
      <div className="pokemon-grid">
        {pokemon.length === 0 ? (
          <p>Loading...</p>
        ) : (
          pokemon.map((poke) => (
            <Card
              key={poke.id}
              // id={poke.id}
              title={poke.name}
              imageUrl={poke.imageUrl}
              onClick={() => handlePokemonClick(poke.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App
