import React from "react";
import renderer from "react-test-renderer";
import Search from "../Search";

describe(`Search component`, () => {
    it(`should render component correctly`, () => {
        const byWhat = "one",
            onSubmit = function (){}, 
            onSearch = function (){}

        const tree = renderer
            .create(<Search 
                onSearch={onSearch} onSubmit={onSubmit} byWhat={byWhat} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});