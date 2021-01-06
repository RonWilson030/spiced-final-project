import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
        // if used: onClick={this.incrementCount}
        // add here: this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("component mounted!");
    }

    handleChange(e) {
        // console.log("e.target.value: ", e.target.value);
        // console.log("e.target.name: ", e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange: ", this.state)
        );
    }

    handleClick() {
        // console.log("click!");
        axios
            .post("/registration", this.state)
            .then((response) => {
                console.log("response: ", response);
                if (response.data.length) {
                    location.replace("/");
                } else {
                    this.setState((state) => ({
                        ...state,
                        error: true,
                    }));
                }
            })
            .catch((err) => {
                this.setState((state) => ({
                    ...state,
                    error: true,
                }));
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <h1>Registration</h1>
                {this.state.error && (
                    <p>Something went wrong! Please try again.</p>
                )}
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="first"
                    placeholder="first name"
                    type="text"
                ></input>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="last"
                    placeholder="last name"
                    type="text"
                ></input>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                    placeholder="email"
                    type="text"
                ></input>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="password"
                    placeholder="password"
                    type="password"
                ></input>
                <button onClick={() => this.handleClick()}>register</button>
                <div>
                    <p>
                        Already a member? <Link to="/login">Log in!</Link>
                    </p>
                </div>
            </div>
        );
    }
}
