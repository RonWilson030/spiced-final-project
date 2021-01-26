import { Component } from "react";
import axios from "./axios";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import Friends from "./friends";
// import Uploader from "./uploader";
import OtherProfile from "./otherprofile";
import Chat from "./chat";
import ShoppingList from "./shoppingList";
import SearchRecipes from "./searchRecipes";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Extras from "./extras";
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
            profilePic: "" || "/default.png",
            bio: "",
            favourites: "",
            // uploaderIsVisible: false,
        };
        this.setImage = this.setImage.bind(this);
        // this.toggleUploader = this.toggleUploader.bind(this);
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

    // toggleUploader() {
    //     // console.log("toggle uploader running!");
    //     this.setState({
    //         uploaderIsVisible: !this.state.uploaderIsVisible,
    //     });
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

    handleLogout() {
        axios
            .get("/logout/")
            .then((response) => {
                console.log("logout response: ", response);
                window.location.href = "/";
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        // if (!id) {return null;}
        return (
            <BrowserRouter>
                <div className="main-container">
                    <header className="header-section">
                        <div>
                            <ProfilePic
                                first={this.state.first}
                                last={this.state.last}
                                profilePic={
                                    this.state.profilePic || "/default.png"
                                }
                            />
                        </div>

                        <div className="hand-cursor">
                            <Link to="/searchrecipes/">
                                <i className="fas fa-utensils"></i>
                                &nbsp;Recipes
                            </Link>
                        </div>

                        <div className="hand-cursor">
                            <Link to="/shoppinglist/">
                                <i className="fas fa-shopping-cart"></i>
                                &nbsp;List
                            </Link>
                        </div>

                        <div className="hand-cursor">
                            <Link to="/friends/">
                                <i className="fas fa-user-friends"></i>
                                &nbsp;Friends
                            </Link>
                        </div>

                        <div className="hand-cursor">
                            <Link to="/chat/">
                                <i className="fas fa-comments"></i>
                                &nbsp;Chat
                            </Link>
                        </div>

                        <div className="hand-cursor">
                            <Link to="/extras/">
                                <i className="fas fa-plus-square"></i>
                                &nbsp;Extras
                            </Link>
                        </div>

                        <div className="hand-cursor">
                            <button onClick={() => this.handleLogout()}>
                                <i className="fas fa-sign-out-alt"></i>
                                &nbsp;Logout
                            </button>
                        </div>
                    </header>

                    <Route
                        exact
                        path="/profile"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                profilePic={
                                    this.state.profilePic || "/default.png"
                                }
                                bio={this.state.bio}
                                favourites={this.state.favourites}
                                setBio={this.setBio}
                                setImage={this.setImage}
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

                    <Route
                        exact
                        path="/searchrecipes"
                        render={() => <SearchRecipes />}
                    />

                    <Route
                        exact
                        path="/shoppinglist"
                        render={() => <ShoppingList />}
                    />

                    <Route exact path="/friends" render={() => <Friends />} />

                    <Route exact path="/chat" render={() => <Chat />} />

                    <Route exact path="/extras" render={() => <Extras />} />

                    {/* <Route
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
                    /> */}
                </div>
                <div>
                    <footer>APPetite (c) | 2021</footer>
                </div>
            </BrowserRouter>
        );
    }
}
