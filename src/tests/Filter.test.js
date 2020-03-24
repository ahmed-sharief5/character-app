import React from "react";
import Filter from "../components/Filter";
import renderer from "react-test-renderer";

it("renders filter component correctly", () => {
    const items = ['one', 'two', 'three'];
    const tree = renderer.create(<Filter elements={items}/>).toJSON();
    expect(tree).toMatchSnapshot();
});
