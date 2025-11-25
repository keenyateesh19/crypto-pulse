import { useContext, useEffect } from "react";
import { HomeContext } from '../context/HomeContext';
import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";
import CurrencyChanger from "../components/CurrencyChanger";
import Spinner from "../components/Spinner";

const HomePage = () => {
    const { homeState, dispatch, API_URL } = useContext(HomeContext);

    const {coins, loading, error, limit, filter, sortBy, currency} = homeState;

  useEffect(() => {
    const fetchCoins = async () => {
      const options = {
        'method': 'GET',
        headers: {
          'x-cg-demo-api-key': import.meta.env.VITE_API_KEY
        },
        'body': undefined
      }
      try {
        const response = await fetch(
          API_URL +
            `?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
            options
        );
        if (!response.ok) throw new Error("Failed to load data");
        const data = await response.json();
        dispatch({type: 'SetData', data})
      } catch (err) {
        dispatch({type: 'SetError', data: err.message})
        console.error(err.message);
      } finally {
        dispatch({ type: 'SetLoading' })
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
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });

  return (
    <div>
      {loading && <Spinner color="white" />}
      {!loading && error && <div className="error">{error}</div>}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={(data) => dispatch({type: 'SetFilter', data})} />
        <SortSelector sortBy={sortBy} onSortChange={(data) => dispatch({type: 'SortBy', data})} />
        <LimitSelector limit={limit} onLimitChange={(data) => dispatch({type: 'SetLimit', data})} />
        <CurrencyChanger currency={currency} onCurrencyChange={(data) => dispatch({type: 'SetCurrency', data})} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <CoinCard coin={coin} currency={currency} key={coin.id} />
            ))
          ) : (
            <p className="error">No match found!</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
