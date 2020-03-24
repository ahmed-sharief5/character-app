import React from "react";
import PropTypes from 'prop-types';

const Filter = ({ elements, value, kind, onSelect }) => {
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {value ? value : kind}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {elements && elements.length > 0 ? 
                    elements.map((ele, idx) => {
                        return <a key={idx} className="dropdown-item" onClick={onSelect} href="#">{ele}</a>
                    })
                    : <a className="dropdown-item" href="#">No items</a>
                }
            </div>
        </div>
    );
}

Filter.propTypes = {
    elements: PropTypes.array,
    value: PropTypes.string,
    kind: PropTypes.string,
    onSelect: PropTypes.func,
};

export default Filter;