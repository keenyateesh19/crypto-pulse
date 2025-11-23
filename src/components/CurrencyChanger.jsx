const CurrencyChanger = ({currency, onCurrencyChange}) => {
    return ( <div className="controls">
        <label htmlFor="currency">Currency</label>
      <select name="currency" id="currency" value={currency} onChange={(e) => onCurrencyChange(e.target.value)}>
        <option value="usd">USD</option>
        <option value="inr">INR</option>
      </select>
      </div> );
}
 
export default CurrencyChanger;