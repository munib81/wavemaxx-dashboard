import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const SearchHistory = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchHistory((prevHistory) => {
      const newHistory = [searchTerm, ...prevHistory.slice(0, 5)]; // Keep the last 6 searches
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      return newHistory;
    });
    setSearchTerm("");
  };

  const handleClear = () => {
    onClear();
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const handleHistoryClick = (term) => {
    onSearch(term);
    setSearchTerm(term);
  };

  const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  const combinedHistory = [...searchHistory, ...storedHistory].slice(0, 6);

  return (
    <div className="fixed top-0 right-0 p-4 bg-white shadow-lg z-50">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-lg mr-2"
        />
        <button
          type="submit"
          className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-indigo-300"
        >
          Search
        </button>
      </form>
      <div className="mt-2 flex items-center">
        {combinedHistory.length > 0 && (
          <>
            <div className="mr-2">Recent searches:</div>
            {combinedHistory.map((term, index) => (
              <div
                key={index}
                className="cursor-pointer text-indigo-500 hover:underline mr-2"
                onClick={() => handleHistoryClick(term)}
              >
                {term}
              </div>
            ))}
            <div
              className="cursor-pointer text-red-500 hover:underline"
              onClick={handleClear}
            >
              <FaTimes />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchHistory;
