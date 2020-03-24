import React from "react";
import Sort from "../components/Sort";
import renderer from "react-test-renderer";

it("renders sort component correctly", () => {
    const tree = renderer.create(<Sort/>).toJSON();
    expect(tree).toMatchSnapshot();
});
