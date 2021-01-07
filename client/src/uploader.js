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

    handleFileChange(e) {
        this.setState({
            [e.target.file]: e.target.files[0],
        });
    }

    handleUpload() {
        // console.log("click!");
        console.log("this.props in uploader: ", this.props);
        this.props.setImage(file);

        axios
            .post("/uploader", this.state)
            .then((response) => {
                console.log("response: ", response);
            })
            .catch((err) => {
                // this.setState((state) => ({
                //     ...state,
                //     error: true,
                // }));
                console.log(err);
            });
    }

    render() {
        console.log("props in uploader: ", this.props);
        return (
            <div>
                <p>change profilepic?</p>
                <input
                    onChange={(e) => this.handleFileChange(e)}
                    name="image"
                    type="file"
                    accept="image/*"
                ></input>
                <button onClick={() => this.handleUpload()}>upload</button>
            </div>
        );
    }
}
