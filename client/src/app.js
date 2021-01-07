import { Component } from "react";
import axios from "./axios";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            first: "",
            last: "",
            url: "",
            bio: "",
            uploaderIsVisible: false,
        };
        this.setImage = this.setImage.bind(this);
        this.toggleUploader = this.toggleModal.bind(this);
    }

    componentDidMount() {
        console.log("app component mounted!");
        axios
            .get("/user")
            .then(({ data }) => {
                this.setState({ ...data }, () => {
                    console.table("this.state: ", this.state);
                });
            })
            .catch((err) => console.log("error receiving data", err));
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

    // setImage(file) {
    //     var formData = new FormData();
    //     this.setState({
    //         profilePic: "url of profilepic",
    //     });
    // }

    render() {
        console.log("this.state.first: ", this.state.first);
        console.log("this.state.last: ", this.state.last);
        return (
            <div>
                <header className="header-section">
                    <img id="logo" src="link" alt="socialnetwork logo" />
                    <h1>App</h1>
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        url={this.state.url}
                        toggleUploader={this.toggleUploader}
                    />
                    <h2 onClick={() => this.toggleUploader()}>
                        demo click me modal
                    </h2>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            setImage={this.setImage}
                            toggleUploader={this.toggleUploader}
                        />
                    )}
                </header>
                <Profile />
            </div>
        );
    }
}
