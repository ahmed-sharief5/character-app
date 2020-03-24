import React from "react";
import PropTypes from 'prop-types';

const Search = ({ onSearch, onSubmit, byWhat }) => {
    return (
        <div style={{ display: "inline-flex"}}>
            <input 
            className="form-control mr-sm-2" 
            onChange={onSearch}
            type="search" 
            placeholder={`Search By ${byWhat}`} 
            aria-label="Search"
            />
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={onSubmit} type="submit">Search</button>
        </div>
    );
}

Search.propTypes = {
    onSearch: PropTypes.func,
    onSubmit: PropTypes.func,
    byWhat: PropTypes.string
}

export default Search;