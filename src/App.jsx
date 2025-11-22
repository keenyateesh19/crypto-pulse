import { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(API_URL + `?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if (!response.ok) throw new Error("Failed to load data");
        const data = await response.json();
        setCoins(data)
      } catch (err) {
        setError(err.message)
        console.error(err.message)
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  },[limit]);

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(filter.toLowerCase()) || coin.symbol.toLowerCase().includes(filter.toLowerCase())
  });

  return (
    <div>
      <h1>Crypto Pulse 🚀</h1>
      {loading && <p>Loading Market Data...</p>}
      {!loading && error && <div className="error">{error}</div>}
      <div className="top-controls">
      <FilterInput filter={filter} onFilterChange={setFilter} />
      <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? filteredCoins.map((coin) => (
            <CoinCard coin={coin} key={coin.id} />
          )) : <p>No match found</p>}
        </main>
      )}
    </div>
  );
}

export default App;
