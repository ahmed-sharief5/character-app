import React from "react";
import Search from "../components/Search";
import renderer from "react-test-renderer";

it("renders search component correctly", () => {
    const tree = renderer.create(<Search/>).toJSON();
    expect(tree).toMatchSnapshot();
});
