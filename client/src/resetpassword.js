import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            view: 1,
        };
    }

    componentDidMount() {
        console.log("component mounted!");
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange: ", this.state)
        );
    }

    handleResetClick() {
        axios
            .post("/password/reset", this.state)
            .then((response) => {
                console.log("response data: ", response.data);
                if (response.data.success) {
                    this.setState((state) => ({
                        ...state,
                        view: 2,
                    }));
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

    handleSubmitCode() {
        axios
            .post("/password/reset/code", this.state)
            .then((response) => {
                console.log("response data code: ", response.data);
                if (response.data.success) {
                    this.setState((state) => ({
                        ...state,
                        view: 3,
                    }));
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
        console.log("state view", this.state.view);
        if (this.state.view === 1) {
            return (
                <div>
                    <h1>Reset Password</h1>
                    <h2>Please enter your registered email:</h2>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        key="key_email"
                        name="email"
                        placeholder="email"
                        type="text"
                    ></input>
                    <button onClick={() => this.handleResetClick()}>
                        Submit
                    </button>
                </div>
            );
        } else if (this.state.view === 2) {
            return (
                <div>
                    <h1>Reset Password</h1>
                    <h2>Please enter your code and new password:</h2>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        key="key_code"
                        name="code"
                        placeholder="code"
                        type="text"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="newpassword"
                        placeholder="new password"
                        type="password"
                    ></input>
                    <button onClick={() => this.handleSubmitCode()}>
                        Submit
                    </button>
                </div>
            );
        } else if (this.state.view === 3) {
            return (
                <div>
                    <h1>Reset Password</h1>
                    <h2>Success!</h2>
                    <Link to="/login">Log in!</Link>
                </div>
            );
        } else {
            <div>
                {this.state.error && (
                    <p>Something went wrong! Please try again.</p>
                )}
            </div>;
        }
    }
}
