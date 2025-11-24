import { Link } from "react-router";

const CoinCard = ({coin, currency}) => {
  const locale = currency === 'inr' ? 'en-IN' : 'en-US';
    return (
      <Link to={`/coin/${coin.id}`}>
        <div className='coin-card'>
              <div className="coin-header">
                <img src={coin.image} alt={coin.name} className="coin-image" />
                <div>
                  <h2>{coin.name}</h2>
                  <p className="symbol">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p><b>Price: {currency === 'inr' ? <span>&#8377;</span> : <span>&#36;</span>}{coin.current_price.toLocaleString(locale)}</b></p>
              <p className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}><b>{(coin?.price_change_percentage_24h >= 0 && '+') || ''}{coin.price_change_percentage_24h?.toFixed(2) || ''}%</b></p>
              <p><b>Market Cap:</b> {currency === 'inr' ? <span>&#8377;</span> : <span>&#36;</span>}{coin.market_cap.toLocaleString(locale)}</p>
            </div>
        </Link>
     );
}
 
export default CoinCard;