import { Component } from "react";
import axios from "./axios";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import FindPeople from "./findpeople";
import Friends from "./friends";
import Menu from "./menu";
import Uploader from "./uploader";
import OtherProfile from "./otherprofile";
import Chat from "./chat";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Bio from "./bio";
// import BioEditor from "./bioeditor";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
            profilePic: "" || "/default.png",
            bio: "",
            // uploaderIsVisible: false,
            menuIsVisible: false,
        };
        this.setImage = this.setImage.bind(this);
        // this.toggleUploader = this.toggleUploader.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    componentDidMount() {
        // console.log("app component mounted!");
        axios
            .get("/api/users/")
            .then(({ data }) => {
                this.setState({ ...data }, () => {
                    // console.log("app user this.state: ", this.state);
                });
            })
            .catch((err) => console.log("error receiving data", err));
    }

    toggleMenu() {
        this.setState({
            menuIsVisible: !this.state.menuIsVisible,
        });
    }

    // toggleUploader() {
    //     // console.log("toggle uploader running!");
    //     this.setState({
    //         uploaderIsVisible: !this.state.uploaderIsVisible,
    //     });
    //     // ALTERNATIVE WAY:
    //     // if (!this.state.uploaderIsVisible) {
    //     //     this.setState({
    //     //         uploaderIsVisible: true,
    //     //     });
    //     // } else {
    //     //     this.setState({
    //     //         uploaderIsVisible: false,
    //     //     });
    //     // }
    // }

    setImage(profilePic) {
        // console.log("set image prop: ", profilePic);
        this.setState({
            profilePic,
        });
    }

    setBio(bio) {
        // console.log("set bio prop: ", bio);
        this.setState({
            bio,
        });
    }

    render() {
        // console.log("this.state.first: ", this.state.first);
        // console.log("this.state.last: ", this.state.last);

        // if (!id) {return null;}
        return (
            <BrowserRouter>
                <div className="container">
                    <header className="header-section">
                        <Link to="/">
                            <img
                                id="logo"
                                src="link"
                                alt="socialnetwork logo"
                            />
                        </Link>
                        <div id="friends" className="hand-cursor">
                            <Link to="/friends/">Friends</Link>
                        </div>
                        <div id="chat" className="hand-cursor">
                            <Link to="/chat/">Chat</Link>
                        </div>
                        <div id="find-friends" className="hand-cursor">
                            <Link to="/users/">Find friends</Link>
                        </div>
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            profilePic={this.state.profilePic || "/default.png"}
                            toggleMenu={this.toggleMenu}
                        />
                    </header>

                    <div id="menu">
                        {this.state.menuIsVisible && (
                            <div>
                                <Menu toggleMenu={this.toggleMenu} />
                            </div>
                        )}
                    </div>

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                profilePic={
                                    this.state.profilePic || "/default.png"
                                }
                                bio={this.state.bio}
                            />
                        )}
                    />

                    <Route
                        path="/users/:id"
                        render={(props) => (
                            <OtherProfile
                                userId={this.state.id}
                                key={props.match.profilePic}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />

                    <Route exact path="/users" render={() => <FindPeople />} />

                    <Route exact path="/friends" render={() => <Friends />} />

                    <Route exact path="/chat" render={() => <Chat />} />

                    <Route
                        exact
                        path="/bio"
                        render={() => (
                            <Bio
                                first={this.state.first}
                                last={this.state.last}
                                profilePic={
                                    this.state.profilePic || "/default.png"
                                }
                                bio={this.state.bio}
                                setBio={this.setBio}
                            />
                        )}
                    />

                    <Route
                        exact
                        path="/uploader"
                        render={() => (
                            <Uploader
                                profilePic={
                                    this.state.profilePic || "default.png"
                                }
                                setImage={this.setImage}
                            />
                        )}
                    />
                </div>
            </BrowserRouter>
        );
    }
}
