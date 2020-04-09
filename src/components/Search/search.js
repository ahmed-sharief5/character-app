import React from "react";
import PropTypes from 'prop-types';

const Search = ({ onSearch, onSubmit, byWhat, value }) => {
    return (
        <div style={{ display: "inline-flex"}}>
            <input 
            className="form-control mr-sm-2" 
            onChange={e=> onSearch(e.target.value)}
            type="search" 
            placeholder={`Search By ${byWhat}`} 
            aria-label="Search"
            value={value}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={onSubmit} type="submit">Search</button>
        </div>
    );
}

Search.propTypes = {
    onSearch: PropTypes.func,
    onSubmit: PropTypes.func,
    byWhat: PropTypes.string,
    value: PropTypes.string
}

export default Search;