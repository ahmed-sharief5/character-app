import React from "react";
import renderer from "react-test-renderer";
import Filter from "../components/Filter";

describe(`Filter component`, () => {
    it(`should render component correctly`, () => {
        const elements = ["one", "two", "four"],
            value = "one",
            kind = "test", 
            onSelect = function (){}

        const tree = renderer
            .create(<Filter 
                        elements={elements}
                        value={value}
                        kind={kind} 
                        onSelect={onSelect} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});