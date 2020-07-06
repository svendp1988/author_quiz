import React, {useEffect} from "react";
import "./AddAuthorForm.css";
import {useForm} from 'react-hook-form';

// class AddAuthorForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: "",
//             nameError: false,
//             nameErrorMessage: "",
//             imageUrl: "",
//             imageUrlError: false,
//             imageUrlErrorMessage: "",
//             books: [],
//             booksError: false,
//             booksErrorMessage: "",
//             bookTemp: "",
//             bookTempError: false,
//             bookTempErrorMessage: "",
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleAddBook = this.handleAddBook.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleChange(e) {
//         this.validateInput(e);
//         this.setState({
//             [e.target.name]: e.target.value,
//         })
//     }
//
//     handleAddBook() {
//         this.setState({
//             books: this.state.books.concat(this.state.bookTemp),
//             bookTemp: "",
//         })
//     }
//
//     handleSubmit(e) {
//         e.preventDefault();
//         this.props.handleSubmit(this.state);
//     }
//
//     validateInput(e) {
//         const target = e.target.name + "Error";
//         const message = target + "Message";
//         const regex=/^[a-zA-Z]+$/;
//         const input = e.target.value;
//         if (!input.match(regex) || input === "") {
//             this.setState({
//                 [target]: true,
//                 [message]: `${e.target.name} needs to be of type string and is required.`,
//             })
//         } else {
//             this.setState({
//                 [target]: false,
//                 [message]: "",
//             })
//         }
//     }
function AddAuthorForm() {
    const {formState, handleSubmit, register, errors, watch, setError } = useForm({
        mode: "onBlur",
    });
    const onSubmit = values => console.log(`Values on submit: `, values, `\n formState is touched: `, formState.touched, '\n errors: ', errors);
    const isValid = {
        email: true,
        username: true,
    }

    useEffect(() => {
        console.log("watch: ", watch("email"));
        if (Object.keys(formState.touched).length > 0) {
            for (let key in formState.touched) {
                console.log(key, formState.touched[key])
            }
        }
    });

    // isFormValid() {
    //     const { name, imageUrl, books } = this.state;
    //     return name.length > 0 && imageUrl.length > 0 && books.length > 0;
    // }
    const handleChange = (e) => {
        console.log("handling change")
        const name = e.target.name;
        if (e.target.value.length === 0) {
            isValid[name] = false;
            setError(name, { type: "required", message: "This field is required" } );
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label> <br/>
            <input
                name="email"
                ref={register({
                    required: "Required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                    }
                })}
                onBlur={handleChange}
            />
            <br/>
            {errors.email && errors.email.message} <br/>
            {!isValid.email ? <span className="error">{errors.email.message}</span> : null } <br/>

            <label htmlFor="username">username</label> <br/>
            <input
                name="username"
                ref={register({
                    validate: value => value !== "admin" || "Nice try!"
                })}
            />
            {errors.username && errors.username.message}

            <button className="ui-button" type="submit">Submit</button>
        </form>
    );
}

// return (
//     <div className="AddAuthorForm">
//         <h1>Add author</h1>
//         <form name="addauthorform" onSubmit={this.handleSubmit}>
//             <div className="AddAuthorForm__input">
//                 <label htmlFor="name">name</label>
//                 <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
//                 {this.state.nameError ? <p className="error">{this.state.nameErrorMessage}</p> : null}
//             </div>
//             <div className="AddAuthorForm__input">
//                 <label htmlFor="imageUrl">image url</label>
//                 <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.handleChange}/>
//                 {this.state.imageUrlError ? <p className="error">{this.state.imageUrlErrorMessage}</p> : null}
//             </div>
//             <div className="AddAuthorForm__input">
//                 <label htmlFor="books">Add books</label>
//                 {this.state.booksError ? <p className="error">{this.state.booksErrorMessage}</p> : null }
//                 <ul>
//                     {this.state.books.map((book) => <li key={book}>{book}</li>)}
//                 </ul>
//                 <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.handleChange}/>
//                 {this.state.bookTempError ? <p className="error">{this.state.bookTempErrorMessage}</p> : null }
//                 <input type="button" value="+" onClick={this.handleAddBook}/>
//             </div>
//             <input type="submit" disabled={!this.isFormValid()} value="submit"/>
//         </form>
//     </div>
// )


export default AddAuthorForm;
