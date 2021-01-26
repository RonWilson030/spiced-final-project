import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, acceptRequest, disconnect } from "./actions";
import FindPeople from "./findPeople";

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
                            <h2>Friends:</h2>
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
                                                    <p>
                                                        {user.first} {user.last}
                                                    </p>
                                                </div>
                                            </Link>
                                            <button
                                                className="button"
                                                onClick={() =>
                                                    dispatch(
                                                        disconnect(user.id)
                                                    )
                                                }
                                            >
                                                Disconnect
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </>
                    ) : (
                        <p>You have no friends!</p>
                    )}
                </div>
                <div id="friends-content">
                    {wannabes.length > 0 ? (
                        <>
                            <h2>Requests:</h2>
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
                                                    <p>
                                                        {user.first} {user.last}
                                                    </p>
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
                        <p>You have no requests!</p>
                    )}
                </div>
            </div>
            <div>
                <FindPeople />
            </div>
        </div>
    );
}
