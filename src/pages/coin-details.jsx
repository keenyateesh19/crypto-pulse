import { useContext, useEffect, useReducer } from "react";
import { Link, useParams } from "react-router";
import { CurrencyContext } from "../context/CurrencyContext";
const API_URL = import.meta.env.VITE_API_COIN_URL;

const CoinDetailsPage = () => {
  const { currency } = useContext(CurrencyContext);
  const locale = currency === "inr" ? "en-IN" : "en-US";
  const symbol = currency === "inr" ? <span>&#8377;</span> : <span>&#36;</span>;
  const { id } = useParams();

  function reducer(state, action) {
    switch (action.type) {
      case "SETCOINS": {
        console.log(action.data);
        return { ...state, coinData: action.data };
      }
      case "STOPLOADING": {
        return { ...state, loading: false };
      }
      case "SETERROR": {
        return { ...state, error: action.error };
      }
      default:
        return state;
    }
  }
  const initialState = {
    coinData: [],
    loading: true,
    error: null,
  };
  const [fetchCoinData, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      },
      body: undefined,
    };
    const fetchCoin = async () => {
      try {
        console.log(API_URL + id);
        const response = await fetch(API_URL + id, options);
        if (!response.ok) throw new Error("Failed to get coin data");
        const data = await response.json();
        dispatch({ type: "SETCOINS", data });
      } catch (err) {
        console.log(err.message);
        dispatch({ type: "SETERROR", error: err.message });
      } finally {
        dispatch({ type: "STOPLOADING" });
      }
    };

    fetchCoin();
  }, [id, currency]);

  const { coinData, loading, error } = fetchCoinData;

  return (
    <div className="coin-details-container">
      <Link to="/">← Back to Home</Link>

      <h1 className="coin-dtails-title">
        {coinData ? `${coinData.name} (${coinData.symbol?.toUpperCase()})` : "Coin Details"}
      </h1>
      {loading && <p>Loading Coin Data. Please Wait...</p>}
      {error && <div className="error">❌ {error}</div>}

      {!loading && !error && (
        <>
          <img
            src={coinData.image.large}
            alt={coinData.name}
            className="coin-details-image"
          />
          <p>{coinData.description.en.split(". ")[0] + "."}</p>
          <div className="coin-details-info">
            <h3>Rank: #{coinData.market_cap_rank}</h3>
            <h3>
              Current Price: {symbol}
              {coinData.market_data.current_price[currency].toLocaleString(
                locale
              )}
            </h3>
            <h4>
              Market Cap: {symbol}
              {coinData.market_data.market_cap[currency].toLocaleString(locale)}
            </h4>
            <h4>
              24h High: {symbol}
              {coinData.market_data.high_24h[currency].toLocaleString(locale)}
            </h4>
            <h4>
              24h Low: {symbol}
              {coinData.market_data.low_24h[currency].toLocaleString(locale)}
            </h4>
            <h4>
              24h Price Change: {symbol}
              {coinData.market_data.price_change_24h.toFixed(2)} (
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>
            <h4>
              Total Supply:{" "}
              {coinData.market_data.total_supply?.toLocaleString(locale) ||
                "N/A"}
            </h4>
            <h4>
              All-Time High: {symbol}
              {coinData.market_data.ath[currency].toLocaleString(
                locale
              )} on{" "}
              {new Date(coinData.market_data.ath_date[currency]).toLocaleString(
                locale
              )}
            </h4>
            <h4>
              All-Time Low: {symbol}
              {coinData.market_data.atl[currency].toLocaleString(
                locale
              )} on{" "}
              {new Date(
                coinData.market_data.atl_date[currency]
              ).toLocaleDateString(locale)}
            </h4>
            <h4>Last Updated: {new Date().toLocaleDateString(locale)}</h4>
          </div>
          <div className="coin-details-links">
            {coinData.links.homepage[0] && (
              <p>
                🌐{" "}
                <a
                  href={coinData.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </p>
            )}
            {coinData.links.blockchain_site[0] && (
              <p>
                🧩{" "}
                <a
                  href={coinData.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blockchain Explorer
                </a>
              </p>
            )}
            {coinData.categories.length > 0 && (
              <p>Categories: {coinData.categories.join(", ")}</p>
            )}

            {!loading && !error && !coinData && <p>No Data Found!</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetailsPage;
