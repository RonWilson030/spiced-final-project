import { Component } from "react";
import axios from "./axios";
import FriendshipButton from "./friendshipbutton";
// import Favourites from "./favouriteRecipes";
export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            first: "",
            last: "",
            email: "",
            bio: "",
            profilePic: "",
            favourites: [],
        };
    }

    componentDidMount() {
        // console.log("this props match: ", this.props.match.params.id);
        const otherUserId = this.props.match.params.id;
        axios
            .get("/api/users/" + otherUserId)
            .then((response) => {
                // console.log("other-user response", response);
                if (response.data.noSuchUser) {
                    this.props.history.push("/profile");
                } else {
                    this.setState({
                        id: response.data.id,
                        first: response.data.first,
                        last: response.data.last,
                        email: response.data.email,
                        bio: response.data.bio,
                        favourites: response.data.favourites,
                        profilePic: response.data.profilePic || "/default.png",
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <>
                <div id="profile">
                    <div className="profile-container">
                        <div className="other-profile-wrapper">
                            <img
                                className="other-profile-avatar"
                                src={this.state.profilePic}
                                alt={`${this.state.first} ${this.state.last}`}
                            />
                            <div className="friendship-button">
                                <FriendshipButton
                                    userId={this.props.userId}
                                    otherUserId={this.props.match.params.id}
                                />
                            </div>
                        </div>
                        <div className="profile-content">
                            <p>
                                {this.state.first} {this.state.last}:
                            </p>
                            <div className="bio">{this.state.bio}</div>
                        </div>
                    </div>
                    <div className="list-title">Favourite recipes:</div>
                    <div className="recipes-container">
                        {this.state.favourites &&
                            this.state.favourites.map((item) => (
                                <div className="recipe-content" key={item.id}>
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <img
                                            className="image hand-cursor"
                                            src={item.imageurl}
                                        ></img>
                                    </a>
                                    <a
                                        className="recipes-title"
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {item.title}
                                    </a>
                                </div>
                            ))}
                    </div>
                </div>
            </>
        );
    }
}
