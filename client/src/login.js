import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange: ", this.state)
        );
    }

    handleClick() {
        axios
            .post("/api/login", this.state)
            .then((response) => {
                console.log("response data: ", response.data);
                if (response.data.success) {
                    location.replace("/profile");
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
            <div id="login">
                {!this.state.error ? (
                    <p>Login:</p>
                ) : (
                    <p>Something went wrong! Please try again.</p>
                )}
                <div className="login-container">
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        placeholder="email"
                        type="email"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        placeholder="password"
                        type="password"
                    ></input>
                    <div>
                        <button onClick={() => this.handleClick()}>
                            Login
                        </button>
                    </div>
                    <div>
                        <Link to="/password/reset">Forgot password?</Link>
                    </div>
                </div>
            </div>
        );
    }
}
