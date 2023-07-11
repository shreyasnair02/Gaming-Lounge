import React from "react";

const SearchInput = ({ searchInput, setSearchInput, searchData }) => {
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="form-control relative dropdown">
      <div className="input-group">
        <input
          type="search"
          placeholder="Search…"
          className="input input-bordered"
          value={searchInput}
          onChange={(e) => handleSearchInput(e)}
        />
        <button className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {searchData ? (
        <ul className="p-2  shadow menu dropdown-content bg-base-100 rounded-box absolute top-10 z-10">
          {searchData.results.map((result) => (
            <li key={result.id}>
              <a>{result.name}</a>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchInput;
