import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }

    componentDidMount() {
        console.log("uploader component mounted!");
    }

    handleFileChange(e) {
        this.setState(
            {
                file: e.target.files[0],
            },
            () => {
                console.log(this.state);
            }
        );
    }

    handleLogout() {
        axios
            .get("/logout/")
            .then((response) => {
                console.log("logout response: ", response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        console.log("props in uploader: ", this.props);
        return (
            <div className="menu-container">
                <div>
                    <Link to="/uploader/">Change Profilepic</Link>
                </div>
                <div>
                    <Link to="/bio/">Edit Bio</Link>
                </div>
                <div>
                    <div
                        className="hand-cursor"
                        onClick={() => this.handleLogout()}
                    >
                        Logout
                    </div>
                </div>
            </div>
        );
    }
}
