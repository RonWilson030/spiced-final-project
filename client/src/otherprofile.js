import { Component } from "react";
import axios from "./axios";
import FriendshipButton from "./friendshipbutton";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firs: "",
            last: "",
            email: "",
            bio: "",
            profilePic: "",
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
                    this.props.history.push("/");
                } else {
                    this.setState({
                        id: response.data.id,
                        first: response.data.first,
                        last: response.data.last,
                        email: response.data.email,
                        bio: response.data.bio,
                        profilePic: response.data.profilePic || "/default.png",
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                <div id="profile">
                    <img
                        id="profile-avatar"
                        className="hand-cursor"
                        src={this.state.profilePic}
                        alt={`${this.state.first} ${this.state.last}`}
                    />
                    <div id="profile-info">
                        <div>
                            {this.state.first} {this.state.last}
                        </div>
                        <div id="bio-text">{this.state.bio}</div>
                    </div>
                    <div>
                        <FriendshipButton
                            userId={this.props.userId}
                            otherUserId={this.props.match.params.id}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
