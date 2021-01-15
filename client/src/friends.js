// import Friendslist from "./friendslist";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";
import { getUsers, acceptRequest, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        (state) => state.users && state.users.profile_pic
    );

    const wannabes = useSelector(
        (state) => state.users && state.users.profile_pic
    );

    useEffect(() => {
        dispatch(getUsers());
        // if (otherUserId && userId) {
        //     axios
        //         .get(`/friendship/status/${otherUserId}`)
        //         .then((response) => {
        //             console.log("friendship status data: ", response);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // }
    }, []);

    // const handleClick = () => {
    // axios
    //     .post("/friendship/action/", {
    //     })
    //     .then((result) => {
    //         console.log("post result: ", result);
    //         setButtonText(text);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // };

    return (
        <div>
            <div>
                <h1>friends:</h1>
                {friends.map((user) => (
                    <Link to={`/users/${user.id}`} key={user.id}>
                        <div>
                            <img
                                id="profile-avatar"
                                src={friends.profile_pic}
                            ></img>
                            {friends.first} {friends.last}
                        </div>
                    </Link>
                ))}
                <button onClick={() => dispatch(unfriend(friends.id))}>
                    Unfriend
                </button>
            </div>

            <div>
                <h1>requests:</h1>
                {wannabes.map((user) => (
                    <Link to={`/users/${user.id}`} key={user.id}>
                        <div>
                            <img
                                id="profile-avatar"
                                src={wannabes.profile_pic}
                            ></img>
                            {wannabes.first} {wannabes.last}
                        </div>
                    </Link>
                ))}
                <button onClick={() => dispatch(acceptRequest(friends.id))}>
                    Accept
                </button>
            </div>
        </div>
    );
}

// <div id="profile">
//     {/* <img
//         id="profile-avatar"
//         className="hand-cursor"
//         src={this.state.profilePic}
//         alt={`${this.state.first} ${this.state.last}`}
//     /> */}
//     {/* <div id="profile-info">
//         <div>
//             {this.state.first} {this.state.last}
//         </div> */}
//         {/* <div id="make-friends-button">
//             <FriendshipButton
//                 userId={this.props.userId}
//                 otherUserId={this.props.match.params.id}
// //             />
// //         </div> */}
// //     </div>
// // </div>
// // {/* <div>
// //     <button onClick={handleClick}>button</button>
// // </div> */}

/* <div id="friends-container">
                <h1>friends</h1>
                <Friendslist
                    users={friends}
                    buttonText={"Unfriend"}
                    dispatch={(e) => dispatch(unfriend(e))}
                />
                <h1>Wannabes</h1>
                <Friendslist
                    users={wannabes}
                    buttonText={"Accept"}
                    dispatch={(e) => dispatch(acceptRequest(e))}
                />
            </div> */
