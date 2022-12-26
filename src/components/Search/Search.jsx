import React from "react";
// import { useState } from "react";
import "./Search.scss";

import { GoSearch } from "react-icons/go";
const Search = ({ onSearch, value }) => {
  // const [query, setQuery] = useState("");

  // function handleChange(e) {
  //   setQuery(e.target.value);
  //   onSearch(e);
  // }

  return (
    <section>
      <div className="search_wrapper">
        <div className="search">
          <input
            className="search__input"
            type="text"
            value={value}
            onChange={onSearch}
            placeholder="Search your notes"
          />
          <GoSearch className="search__svg" />
          {/* <svg
        className="search__svg"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd">
        <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
      </svg> */}
        </div>
      </div>
    </section>
  );
};

export default Search;
