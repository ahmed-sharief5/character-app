import React from "react";
import PropTypes from 'prop-types';

const Sort = ({ onClick, byWhich, sortBy }) => {
    return (
        <button type="button" onClick={onClick} className="btn btn-info">{`Sort ${byWhich} by ${sortBy}`}</button>
    );
}

Sort.propTypes = {
    onClick: PropTypes.func,
    byWhich: PropTypes.string,
    sortBy: PropTypes.string
}

export default Sort;