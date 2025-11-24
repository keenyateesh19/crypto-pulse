import { useState } from "react";
import HomePage from "./pages/home";
import { HomeContext } from "./context/HomeContext";
import { Route, Routes } from "react-router";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFound from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [currency, setCurrency] = useState(() => {
    const userLang = navigator.language;
    return userLang === "en-IN" ? "inr" : "usd";
  });

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomeContext.Provider
              value={{
                coin: [coins, setCoins],
                load: [loading, setLoading],
                err: [error, setError],
                limits: [limit, setLimit],
                inputFilter: [filter, setFilter],
                sort: [sortBy, setSortBy],
                currencyValue: [currency, setCurrency],
                API_URL,
              }}
            >
              <HomePage />
            </HomeContext.Provider>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
}

export default App;
