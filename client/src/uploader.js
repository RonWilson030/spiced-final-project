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

    render() {
        // console.log("props in uploader: ", this.props);
        return (
            <div id="uploader">
                <div id="uploader-container">
                    <div>
                        <img
                            className="uploader-image"
                            src={this.props.profilePic || "/default.png"}
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => this.handleFileChange(e)}
                            name="image"
                            type="file"
                            accept="image/*"
                        ></input>
                    </div>
                    <div>
                        <button
                            className="hand-cursor"
                            onClick={() => this.handleUpload()}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
