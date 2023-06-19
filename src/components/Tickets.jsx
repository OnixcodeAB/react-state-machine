import React from "react";
import "../style/Tickets.css";

export const Tickets = ({ state, send }) => {
  const country = state.context.selectedCountry; 
    const passengers = state.context.passengers
  const finish = () => {
    send("FINISH");
  };

  return (
    <div className="Tickets">
      <p className="Tickets-description description">
        Gracias por volar con book a fly 💚
      </p>
      <div className="Tickets-ticket">
        <div className="Tickets-country">{country}</div>
        <div className="Tickets-passengers">
          <span>{passengers} ✈</span>
        </div>
      </div>
      <button onClick={finish} className="Tickets-finalizar button">
        Finalizar
      </button>
    </div>
  );
};
