const CoinCard = ({coin}) => {
    return ( 
        <div className='coin-card'>
              <div className="coin-header">
                <img src={coin.image} alt={coin.name} className="coin-image" />
                <div>
                  <h2>{coin.name}</h2>
                  <p className="symbol">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p><b>Price: ${coin.current_price.toLocaleString()}</b></p>
              <p className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}><b>{coin.price_change_percentage_24h >= 0 && '+'}{coin.price_change_percentage_24h.toFixed(2)}%</b></p>
              <p><b>Market Cap:</b> {coin.market_cap}</p>
            </div>
     );
}
 
export default CoinCard;