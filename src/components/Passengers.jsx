import React, { useState } from "react";
import "../style/Passengers.css";

export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState("");

  const { passengers } = state.context;

  console.log(passengers);

  const goToTicket = () => {
    send("DONE");
  };

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    send("ADD", { newPassengers: value });
    changeValue("");
  };

  return (
    <form onSubmit={submit} className="Passengers">
      <p className="Passengers-title title">
        Agrega a las personas que van a volar ✈️
      </p>
      {passengers.map((person, idx) => (
        <p className="passengers-users" key={idx}>{person}</p>
      ))}
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Escribe el nombre completo"
        required
        value={value}
        onChange={onChangeInput}
      />
      <div className="Passengers-buttons">
        <button className="Passengers-add button-secondary" type="submit">
          Agregar Pasajero
        </button>
        <button
          className="Passenger-pay button"
          type="button"
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};
