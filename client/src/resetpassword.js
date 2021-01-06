import { Component } from "react";
import axios from "./axios";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            viewReset: 1,
            viewCode: 2,
            viewSuccess: 3,
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
            .post("/resetpassword")
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
        if (this.state.viewReset === 1) {
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
        } else if (this.state.viewCode === 2) {
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
        } else if (this.state.viewSuccess === 3) {
            return (
                <div>
                    <h1>Reset Password</h1>
                    <h2>Suceess!</h2>
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
