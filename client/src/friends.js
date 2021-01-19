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
            <div id="friends-container">
                <div id="friends-content">
                    <div>
                        {friends &&
                            friends.map((user) => (
                                <div key={user.id}>
                                    <h1>Friends:</h1>
                                    <Link to={`/users/${user.id}`}>
                                        <div>
                                            <img
                                                id="friends-avatar"
                                                src={
                                                    user.profile_pic ||
                                                    "/default.png"
                                                }
                                            ></img>
                                            <div>
                                                {user.first} {user.last}
                                            </div>
                                        </div>
                                    </Link>
                                    <button
                                        className="button"
                                        onClick={() =>
                                            dispatch(unfriend(user.id))
                                        }
                                    >
                                        Unfriend
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
                <div id="friends-content">
                    {wannabes &&
                        wannabes.map((user) => (
                            <div key={user.id}>
                                <h1>Requests:</h1>
                                <Link to={`/users/${user.id}`}>
                                    <div>
                                        <img
                                            id="friends-avatar"
                                            src={
                                                user.profile_pic ||
                                                "/default.png"
                                            }
                                        ></img>
                                        <div>
                                            {user.first} {user.last}
                                        </div>
                                    </div>
                                </Link>
                                <button
                                    onClick={() =>
                                        dispatch(acceptRequest(user.id))
                                    }
                                >
                                    Accept
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
