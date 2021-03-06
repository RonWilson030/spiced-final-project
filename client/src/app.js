import { Component } from "react";
import axios from "./axios";
import Profile from "./profile";
// import ProfilePic from "./profilepic";
import Friends from "./friends";
import Login from "./login";
import OtherProfile from "./otherprofile";
import Chat from "./chat";
import Init from "./init";
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
        };
        this.setImage = this.setImage.bind(this);
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
                window.location.href = "/welcome#/login/";
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
                        <div className="main-title">
                            <div>
                                <i className="fas fa-pizza-slice"></i>
                            </div>
                            <div>
                                <i className="fas fa-carrot"></i>
                            </div>
                            <div>
                                <i className="fas fa-fish"></i>
                            </div>
                            <div>APPETITE!</div>
                            <div>
                                <i className="fas fa-cheese"></i>
                            </div>
                            <div>
                                <i className="fas fa-drumstick-bite"></i>
                            </div>
                            <div>
                                <i className="fas fa-pepper-hot"></i>
                            </div>
                        </div>
                    </header>
                    <nav>
                        <label htmlFor="id-menu" className="hand-cursor">
                            <div className="nav-icon">
                                <i className="fa fa-navicon"></i>
                            </div>
                        </label>
                        <input
                            type="checkbox"
                            id="id-menu"
                            className="menu"
                            role="button"
                        ></input>
                        <div className="menu-navbar">
                            <ul className="navUL">
                                <li>
                                    <div className="hand-cursor">
                                        <Link to="/profile/">
                                            <i className="fas fa-user-circle"></i>
                                            &nbsp;Profile
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="hand-cursor">
                                        <Link to="/searchrecipes/">
                                            <i className="fas fa-utensils"></i>
                                            &nbsp;Recipes
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="hand-cursor">
                                        <Link to="/shoppinglist/">
                                            <i className="fas fa-shopping-cart"></i>
                                            &nbsp;Shopping List
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="hand-cursor">
                                        <Link to="/friends/">
                                            <i className="fas fa-user-friends"></i>
                                            &nbsp;Friends
                                        </Link>
                                    </div>
                                </li>

                                <li>
                                    <div className="hand-cursor">
                                        <Link to="/chat/">
                                            <i className="fas fa-comments"></i>
                                            &nbsp;Chat
                                        </Link>
                                    </div>
                                </li>

                                <li>
                                    <div className="hand-cursor">
                                        <Link to="/extras/">
                                            <i className="fas fa-plus-square"></i>
                                            &nbsp;Extras
                                        </Link>
                                    </div>
                                </li>

                                <li>
                                    <div
                                        className="hand-cursor"
                                        onClick={() => this.handleLogout()}
                                    >
                                        <a>
                                            <i className="fas fa-sign-out-alt"></i>
                                            &nbsp;Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>

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

                    <Route path="/login" render={() => <Login />} />

                    <Route exact path="/" render={() => <Init />} />
                </div>
                <div>
                    <footer>APPetite (c) | 2021</footer>
                </div>
            </BrowserRouter>
        );
    }
}
