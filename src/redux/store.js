import { createStore } from "redux";

/* global window */

// Starea inițială, dacă nu există stare salvată în localStorage
const initialState = {
  fiat: 0,
  btc: 0,
  eth: 0,
  transactions: [],
};

// Funcție pentru a încărca starea din localStorage
function loadState() {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
}

// Funcție pentru a salva starea în localStorage
function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
}

function balanceReducer(state = initialState, action) {
  switch (action.type) {
    case "DEPOSIT_FIAT":
      return { ...state, fiat: state.fiat + action.payload };
    case "DEPOSIT_BTC":
      return { ...state, btc: state.btc + action.payload };
    case "DEPOSIT_ETH":
      return { ...state, eth: state.eth + action.payload };
    case "WITHDRAW_FIAT":
      return { ...state, fiat: state.fiat - action.payload };
    case "WITHDRAW_BTC":
      return { ...state, btc: state.btc - action.payload };
    case "WITHDRAW_ETH":
      return { ...state, eth: state.eth - action.payload };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    default:
      return state;
  }
}

// Acțiuni
export const depositFiat = (amount) => ({
  type: "DEPOSIT_FIAT",
  payload: amount,
});

export const depositBtc = (amount) => ({
  type: "DEPOSIT_BTC",
  payload: amount,
});

export const depositEth = (amount) => ({
  type: "DEPOSIT_ETH",
  payload: amount,
});

export const withdrawFiat = (amount) => ({
  type: "WITHDRAW_FIAT",
  payload: amount,
});

export const withdrawBtc = (amount) => ({
  type: "WITHDRAW_BTC",
  payload: amount,
});

export const withdrawEth = (amount) => ({
  type: "WITHDRAW_ETH",
  payload: amount,
});

export const addTransaction = (transaction) => ({
  type: "ADD_TRANSACTION",
  payload: transaction,
});

// Încărcăm starea salvată (dacă există)
const persistedState = loadState();

// Verificăm dacă Redux DevTools este disponibil
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : undefined;

// Creăm store-ul cu starea persistată
export const store = createStore(balanceReducer, persistedState, devTools);

// Abonare pentru salvarea oricărei modificări în localStorage
store.subscribe(() => {
  saveState(store.getState());
});
