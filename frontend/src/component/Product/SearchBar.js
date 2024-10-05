import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <div className="header-search-container">
        <form onSubmit={searchSubmitHandler}>
          <input
            type="search"
            value={keyword}
            className="search-field"
            placeholder="Enter your product name..."
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button type="submit" value="Search" className="search-btn">
            <Search />
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
