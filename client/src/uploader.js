import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader component mounted!");
    }

    handleChange(e) {
        this.setState(
            {
                // [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange: ", this.state)
        );
    }

    handleClick() {
        // console.log("click!");
        console.log("this.props in uploader: ", this.props);
        this.props.setImage("argument");
        // axios
        //     .post("/uploader", this.state)
        //     .then((response) => {
        //         console.log("response: ", response);
        //     })
        //     .catch((err) => {
        //         // this.setState((state) => ({
        //         //     ...state,
        //         //     error: true,
        //         // }));
        //         console.log(err);
        //     });
    }

    render() {
        console.log("props in uploader: ", this.props);
        return (
            <div>
                <h1 onClick={() => this.handleClick()}>uploader</h1>
            </div>
        );
    }
}
