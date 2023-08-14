import React, { useState, Fragment } from "react";
import MetaData from "../Layout/MetaData";
import "./search.css";
import { useNavigate } from "react-router";
const Search = () => {
  const [keyword, setKeyword] = useState("");
    const navigate=useNavigate()
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    
      navigate(`/products/${keyword}`);
     
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;