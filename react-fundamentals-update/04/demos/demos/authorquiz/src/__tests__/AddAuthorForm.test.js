import React from 'react';
import Enzyme, {mount, shallow, render} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import AddAuthorForm from "../AddAuthorForm";

describe("AddAuthorForm", () => {
    let component;

    const state = {email: "sven.depotter@hotmail.com", username: "sven"}
    const handleSubmit = jest.fn();

    beforeEach(() => {
        component = mount(<AddAuthorForm {...state} onSubmit={handleSubmit}/>);
        component.find(".ui-button").simulate("click");
    })

    it('should submit form', function () {
        expect("handleSubmit").toHaveBeenCalled();
    });
})
