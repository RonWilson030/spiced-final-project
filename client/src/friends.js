import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, acceptRequest, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        (state) =>
            state.users &&
            state.users.filter((user) => {
                return user.accepted;
            })
    );

    const wannabes = useSelector(
        (state) =>
            state.users &&
            state.users.filter((user) => {
                return !user.accepted;
            })
    );

    useEffect(() => {
        dispatch(getFriends());
    }, []);

    return (
        <div>
            <div>
                <h1>friends:</h1>
                {friends &&
                    friends.map((user) => (
                        <div key={user.id}>
                            <Link to={`/users/${user.id}`}>
                                <div>
                                    <img
                                        id="profile-avatar"
                                        src={user.profile_pic || "/default.png"}
                                    ></img>
                                    {user.first} {user.last}
                                </div>
                            </Link>
                            <button
                                className="button"
                                onClick={() => dispatch(unfriend(user.id))}
                            >
                                Unfriend
                            </button>
                        </div>
                    ))}
            </div>

            <div>
                <h1>requests:</h1>
                {wannabes &&
                    wannabes.map((user) => (
                        <div key={user.id}>
                            <Link to={`/users/${user.id}`}>
                                <div>
                                    <img
                                        id="profile-avatar"
                                        src={user.profile_pic || "/default.png"}
                                    ></img>
                                    {user.first} {user.last}
                                </div>
                            </Link>
                            <button
                                onClick={() => dispatch(acceptRequest(user.id))}
                            >
                                Accept
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}
