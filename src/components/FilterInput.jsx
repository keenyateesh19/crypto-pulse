const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      <img src="/search.svg" className="icon" />
      <input
        type="text"
        value={filter}
        placeholder="Search by crypto name or ticker..."
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;
