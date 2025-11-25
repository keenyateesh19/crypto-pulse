import { useReducer } from "react";
import HomePage from "./pages/home";
import { HomeContext } from "./context/HomeContext";
import { Route, Routes } from "react-router";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFound from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";
import { CurrencyContext } from "./context/CurrencyContext";

const API_URL = import.meta.env.VITE_API_MARKET_URL;

function App() {
  function reducer(state, action) {
    switch (action.type) {
      case  'SetData': 
        return {...state, coins: action.data};
      case 'SetError':
        return {...state, error: action.data};
      case 'SetLoading':
        return {...state, loading: false};
      case 'SortBy':
        return {...state, sortBy: action.data};
      case 'SetLimit':
        return {...state, limit: action.data};
      case 'SetCurrency':
        return {...state, currency: action.data};
      case 'SetFilter':
        return {...state, filter: action.data}
      default:
        return state;
    }
  }

  const initialHome = {
    coins: [],
    loading: true,
    error: null,
    limit: 10,
    filter: "",
    sortBy: "market_cap_desc",
    currency: (() => {
      const userLang = navigator.language;
      return userLang === "en-IN" ? "inr" : "usd";
    })(),
  };

  const [homeState, dispatch] = useReducer(reducer, initialHome);

  const {currency} = homeState;

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomeContext.Provider
              value={{homeState, dispatch, API_URL}}
            >
              <HomePage />
            </HomeContext.Provider>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/coin/:id"
          element={
            <CurrencyContext.Provider value={{ currency }}>
              <CoinDetailsPage />
            </CurrencyContext.Provider>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
