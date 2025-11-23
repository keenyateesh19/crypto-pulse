const CurrencyChanger = ({currency, onCurrencyChange}) => {
    return ( <div className="controls">
        <label htmlFor="currency">{currency === 'inr' ? <span>&#8377;</span> : <span>&#36;</span>}</label>
      <select name="currency" id="currency" value={currency} onChange={(e) => onCurrencyChange(e.target.value)}>
        <option value="usd">USD</option>
        <option value="inr">INR</option>
      </select>
      </div> );
}
 
export default CurrencyChanger;