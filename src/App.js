import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './styles.css';

import api from './services/api';

const typeTranslations = {
  normal: 'Normal',
  fighting: 'Lutador',
  flying: 'Voador',
  poison: 'Veneno',
  ground: 'Terra',
  rock: 'Pedra',
  bug: 'Inseto',
  ghost: 'Fantasma',
  steel: 'Aço',
  fire: 'Fogo',
  water: 'Água',
  grass: 'Planta',
  electric: 'Elétrico',
  psychic: 'Psíquico',
  ice: 'Gelo',
  dragon: 'Dragão',
  dark: 'Noturno',
  fairy: 'Fada',
};

function translateAndCapitalize(type) {
  const translatedType = typeTranslations[type];
  return translatedType.charAt(0).toUpperCase() + translatedType.slice(1);
}

function App() {
  const [input, setInput] = useState('');
  const [poke, setPoke] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert('Digite algum nome na barra de pesquisa!');
      return;
    }

    const lowercaseInput = input.toLowerCase();

    try {
      const response = await api.get(`${lowercaseInput}/`);
      setPoke(response.data);
      setInput('');
    } catch {
      alert('Opa! Esse Pokémon realmente existe?🤔');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscar Pokémon</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o nome do Pokémon..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <AiOutlineSearch size={25} color="white" />
        </button>
      </div>

      <main className="main">
        <h2>Pokémon: {poke.name ? poke.name.charAt(0).toUpperCase() + poke.name.slice(1) : ''}</h2>
        {poke.id && <span>Número Pokédex: #{poke.id.toString().padStart(3, '0')}</span>}
        {poke.types && (
          <span>
            Tipo: {poke.types.map((type) => translateAndCapitalize(type.type.name)).join(', ')}
          </span>
        )}
        {poke.height && <span>Altura média: {(poke.height / 10).toFixed(1)}m</span>}
        {poke.weight && <span>Peso médio: {(poke.weight / 10).toFixed(1)}kg</span>}
      </main>
    </div>
  );
}

export default App;