import React from "react";
import renderer from "react-test-renderer";
import Sort from "../components/Sort";

describe(`Sort component`, () => {
    it(`should render component correctly`, () => {
        const byWhich = "one",
            sortBy = "asc", 
            onClick = function (){}

        const tree = renderer
            .create(<Sort 
                onClick={onClick} byWhich={byWhich} sortBy={sortBy} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});