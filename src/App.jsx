import { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";

const API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to load data");
        const data = await response.json();
        console.log(data)
        setCoins(data)
      } catch (err) {
        setError(err.message)
        console.error(err.message)
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  },[]);

  return (
    <div>
      <h1>Crypto Pulse 🚀</h1>
      {loading && <p>Loading Market Data...</p>}
      {error && <div className="error">{error}</div>}

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
