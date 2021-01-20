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
                    {friends.length > 0 ? (
                        <>
                            <h1>Friends:</h1>
                            <div className="friends-wrapper">
                                {friends &&
                                    friends.map((user) => (
                                        <div className="friends" key={user.id}>
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
                        </>
                    ) : (
                        <h1>You have no friends!</h1>
                    )}
                </div>
                <div id="friends-content">
                    {wannabes.length > 0 ? (
                        <>
                            <h1>Requests:</h1>
                            <div className="friends-wrapper">
                                {wannabes &&
                                    wannabes.map((user) => (
                                        <div className="friends" key={user.id}>
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
                                                    dispatch(
                                                        acceptRequest(user.id)
                                                    )
                                                }
                                            >
                                                Accept
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </>
                    ) : (
                        <h1>You have no requests!</h1>
                    )}
                </div>
            </div>
        </div>
    );
}
