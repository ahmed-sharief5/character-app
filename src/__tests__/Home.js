import React from "react";
import * as ReactRedux from 'react-redux';
import renderer from "react-test-renderer";
import sinon from "sinon";
import Home from "../containers/Home";

describe(`Home component`, () => {
    let spyDispatch, useSelectorStub, useDispatchStub;

    beforeAll(() => {
        spyDispatch = sinon.spy();
        useSelectorStub = sinon.stub(ReactRedux, "useSelector").returns({})
        useDispatchStub = sinon.stub(ReactRedux, "useDispatch").returns({spyDispatch})
    });

    afterAll(() => {
        useSelectorStub.restore(); 
        useDispatchStub.restore();
    });

    it(`should render component correctly`, () => {
        const tree = renderer
            .create(<Home/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});