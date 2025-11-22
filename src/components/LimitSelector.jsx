const LimitSelector = ({limit, onLimitChange}) => {
    return ( <div className="controls">
        <label htmlFor="limit">Show: </label>
      <select name="limit" id="limit" value={limit} onChange={(e) => onLimitChange(Number(e.target.value))}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="75">75</option>
      </select>
      </div> );
}
 
export default LimitSelector;