import React, { useState } from 'react';
import '../style/Search.css';

export const Search = ({ state, send }) => {
  const [flight, setFlight] = useState('');

  const goToPaseengers = () => {
    send("CONTIUNE", {selectedCountry: flight});
  }

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const options = state.context.countries;

  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
        <option value="" disabled defaultValue>Escoge un país</option>
        {options.map((option, idx) => <option value={option.name.common} key={idx}>{option.name.common}</option>)}
      </select>
      <button onClick={goToPaseengers} disabled={flight === ''} className='Search-continue button'>Continuar</button>
    </div>
  );
}; 