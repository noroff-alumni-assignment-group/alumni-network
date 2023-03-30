// Search.tsx
import React, { useState } from "react";
import './search.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";


interface SearchProps {
  onSearch: any
}

function Search (props: SearchProps) {

  const [searchTerm, setSearchTerm] = useState("");

  return (
      <div className={`search-cnt search-cnt-active`}>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(event)=> event.key === "Enter"?props.onSearch(searchTerm):null}
            placeholder="Search..."
            className="search-input"
        />
          <button className="search-btn" onClick={() => props.onSearch(searchTerm)}>
              <FontAwesomeIcon icon={faSearch} className={"search-btn-icon"}/>
          </button>
      </div>
  );
}

export default Search;
