import { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";
import SortSelector from "./components/SortSelector";
import CurrencyChanger from "./components/CurrencyChanger";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [currency, setCurrency] = useState(() => {
    const userLang = navigator.language;
    return userLang === 'en-IN' ? 'inr' : 'usd'
  });

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          API_URL +
            `?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!response.ok) throw new Error("Failed to load data");
        const data = await response.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit, currency]);

  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'market_cap_desc':
          return  b.market_cap - a.market_cap;
        case 'market_cap_asc':
          return  a.market_cap - b.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });

  return (
    <div>
      <h1>Crypto Pulse 🚀</h1>
      {loading && <p className="error">Loading Market Data...</p>}
      {!loading && error && <div className="error">{error}</div>}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <CurrencyChanger currency={currency} onCurrencyChange={setCurrency} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard coin={coin} currency={currency} key={coin.id} />)
          ) : (
            <p className="error">No match found!</p>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
