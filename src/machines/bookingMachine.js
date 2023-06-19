import { createMachine, assign } from "xstate";
import { fetchCountries } from "../Utils/Api";

//maquina hija
const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      // Agregando Servicios
      invoke: {
        id: "getCountries",
        src: () => fetchCountries,
        onDone: {
          target: "success",
          actions: assign({
            countries: (context, event) => event.data,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: "Fallo el request",
          }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine(
  {
    predictableActionArguments: true,
    id: "buy plane tickets",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: "",
      countries: [],
      error: "",
    },
    states: {
      initial: {
        on: {
          // Configurando una accion en trasicion
          START: {
            target: "search",
            actions: "imprimirInicio",
          },
        },
      },

      search: {
        // Configurando acciones de entrada y salida
        entry: "imprimirEntrada",
        exit: "imprimirSalida",
        on: {
          // Accion de transicion
          CONTIUNE: {
            target: "passengers",
            actions: assign({
              selectedCountry: (context, event) => event.selectedCountry,
            }),
          },
          CANCEL: "initial",
        },
        // agregando maquina hija.
        ...fillCountries,
      },

      tickets: {
        after: {
          5000: {
            target: "initial",
            actions: "clearContext",
          },
        },
        on: {
          FINISH: "initial",
          CANCEL: "initial",
        },
      },

      passengers: {
        on: {
          DONE: "tickets",
          CANCEL: {
            target: "initial",
            actions: "clearContext",
          },
          ADD: {
            target: "passengers",
            actions: assign((context, event) =>
              context.passengers.push(event.newPassengers)
            ),
          },
        },
      },
    },
  },
  {
    // configuraciones de las acciones
    actions: {
      imprimirInicio: () => {
        console.log("Imprimir Inicio");
      },
      imprimirEntrada: () => {
        console.log("Imprimir Entrada");
      },
      imprimirSalida: () => {
        console.log("Imprimir Salida");
      },
      clearContext: assign({
        selectedCountry: "",
        passengers: [],
      }),
    },
  }
);

export default bookingMachine;
