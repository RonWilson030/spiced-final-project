import { Component } from "react";
import axios from "./axios";

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
            .post("/resetpassword/reset", this.state)
            .then((response) => {
                console.log("response data: ", response.data);
                if (response.data.length) {
                    // location.replace("/");
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
        if (this.state.view === 1) {
            return (
                <div>
                    <h1>Reset Password</h1>
                    <h2>Please enter your registered email:</h2>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        placeholder="email"
                        type="text"
                    ></input>
                    <button onClick={() => this.handleClick()}>submit</button>
                </div>
            );
        } else if (this.state.view === 2) {
            return (
                <div>
                    <h1>Reset Password</h1>
                    <h2>Please enter your code and new password:</h2>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="code"
                        placeholder="code"
                        type="text"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="newPassword"
                        placeholder="new password"
                        type="password"
                    ></input>
                    <button onClick={() => this.handleClick()}>submit</button>
                </div>
            );
        } else if (this.state.view === 3) {
            return (
                <div>
                    <h1>Reset Password</h1>
                    <h2>Success!</h2>
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
