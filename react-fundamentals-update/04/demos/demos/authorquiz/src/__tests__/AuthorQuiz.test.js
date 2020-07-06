import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from '../AuthorQuiz';
import Enzyme, {mount, shallow, render} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const state = {
    turnData: {
        books: ['The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet', 'Macbeth', 'Romeo and Juliet'],
        author: {
            name: 'Charles Dickens',
            imageUrl: 'images/authors/charlesdickens.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['David Copperfield', 'A Tale of Two Cities']
        },
    },
    highlight: 'none'
}

describe("Author Quiz", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
    });

    let component;
    describe("Wen no answer has been selected", () => {
        beforeEach(() => {
            component = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} /> )
        });

        test("it should have no background color", () => {
            expect(component.find("div.row.turn").props().style.backgroundColor).toBe("");
        })
    })

    describe("When the wrong answer has been selected", () => {
        beforeEach(() => {
            component = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: "wrong"}))} onAnswerSelected={() => {}} /> );
        })

        it("should have a red background color", () => {
            expect(component.find("div.row.turn").props().style.backgroundColor).toBe("red");
        })
    })

    describe("When the correct answer has been selected", () => {
        beforeEach(() => {
            component = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: "correct"}))} onAnswerSelected={() => {}} /> );
        })

        it('should have a green background color', () => {
            expect(component.find("div.row.turn").props().style.backgroundColor).toBe("green");
        });
    })

    describe("When the first answer is selected", () => {
        const handleAnswerSelected = jest.fn();
        beforeEach(() => {
            component = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} /> );
            component.find(".answer").first().simulate("click");
        })

        test("handleAnswerSelected should have been called", () => {
            expect(handleAnswerSelected).toHaveBeenCalled();
        })

        it('should receive The Shining', function () {
            expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
        });
    })
});


