import { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

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

  return (
    <div>
      <h1>Crypto Pulse 🚀</h1>
      {loading && <p>Loading Market Data...</p>}
      {!loading && error && <div className="error">{error}</div>}
      <LimitSelector limit={limit} onLimitChange={setLimit} />

      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard coin={coin} key={coin.id} />
          ))}
        </main>
      )}
    </div>
  );
}

export default App;
