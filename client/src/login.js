import { Component } from "react";
import axios from "./axios";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
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
            .post("/login")
            .then((response) => {
                console.log("response data: ", response.data);
                location.replace("/");
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
                <h1>Login</h1>
                {this.state.error && (
                    <p>Something went wrong! Please try again.</p>
                )}
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
                <button onClick={() => this.handleClick()}>login</button>
                <div>
                    <Link to="/resetpassword">Forgot password?</Link>
                </div>
            </div>
        );
    }
}
