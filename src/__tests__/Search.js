import React from "react";
import renderer from "react-test-renderer";
import Search from "../components/Search";
import { shallow, mount } from 'enzyme';

describe(`Search component`, () => {
    const searchInput = "Rich";
    const byWhat = "Name",
        onSubmit = jest.fn(), 
        onSearch = jest.fn()

    const tree = renderer
            .create(<Search 
                onSearch={onSearch} onSubmit={onSubmit} byWhat={byWhat} />);

    const testInstance = tree.root;
    
    it(`should render component correctly`, () => {
        tree.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it(`should call the search function`, () => {
        const inputField = testInstance.findByType("input");

        inputField.props.onChange({ target: { value: searchInput } });
        // expect(inputField.props.value).toBe("searchInput");
        expect(onSearch).toHaveBeenCalled() 
        expect(onSearch).toHaveBeenCalledWith(searchInput) 
    });

    it(`show call the submit function`, () => {
        const button = shallow((<Search 
            onSearch={onSearch} onSubmit={onSubmit} byWhat={byWhat} />));
        // const button = testInstance.findByType("button");
        // console.log(button.props)
    });
});