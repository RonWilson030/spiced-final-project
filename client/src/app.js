import { Component } from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "Ron",
            last: "Wilson",
            uploaderIsVisible: false,
        };
        this.setImage = this.setImage.bind(this);
    }

    componentDidMount() {
        console.log("app component mounted!");
        // use axios:
        // get info (all except password) on user
        // response stored in state of app
    }

    toggleUploader() {
        console.log("toggle uploader running!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
        // if (!this.state.uploaderIsVisible) {
        //     this.setState({
        //         uploaderIsVisible: true,
        //     });
        // } else {
        //     this.setState({
        //         uploaderIsVisible: false,
        //     });
        // }
    }

    setImage("argument") {
        this.setState({
            profilePic: "url of profilepic",
        });
    }

    render() {
        console.log("this.state.first: ", this.state.first);
        console.log("this.state.last: ", this.state.last);
        return (
            <div>
                <h1>App</h1>
                <ProfilePic first={this.state.first} last={this.state.last} />
                <h2 onClick={() => this.toggleUploader()}>
                    demo click me modal
                </h2>
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
            </div>
        );
    }
}
