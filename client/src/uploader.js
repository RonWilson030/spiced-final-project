import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
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

    handleUpload() {
        // console.log("click!");
        console.log("this.props in uploader: ", this.props);
        var formData = new FormData();
        formData.append("image", this.state.file);

        axios
            .post("/uploader", formData)
            .then((response) => {
                console.log("response: ", response);
                this.props.setImage(response.data.profilePic);
                // this.props.toggleUploader();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    closeModal() {
        // console.log(
        //     "closeModal runs and about to emit an event from the component!!!!!!"
        // );
        this.props.toggleUploader();
    }

    render() {
        console.log("props in uploader: ", this.props);
        return (
            <div className="uploader">
                <img id="uploader-image" src={this.props.profilePic} />
                <p>change profilepic?</p>
                <input
                    onChange={(e) => this.handleFileChange(e)}
                    name="image"
                    type="file"
                    accept="image/*"
                ></input>
                <button
                    className="hand-cursor"
                    onClick={() => this.handleUpload()}
                >
                    upload
                </button>
                <p className="hand-cursor" onClick={() => this.closeModal()}>
                    X
                </p>
            </div>
        );
    }
}
