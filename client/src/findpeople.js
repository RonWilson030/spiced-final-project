import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!query) {
            setUsers([]);
            return;
        }

        let abort;

        (async () => {
            const { data } = await axios.get(`/api/users/search/?q=${query}`);
            if (!abort) {
                setUsers(data);
            }
        })();

        return () => {
            abort = true;
        };
    }, [query]);

    return (
        <div id="find-people">
            <div className="finder-container">
                <div className="finder-content">
                    <h2>Find someone:</h2>
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="search people..."
                    />
                    <div>
                        {users &&
                            users.map((user) => (
                                <Link to={`/users/${user.id}`} key={user.id}>
                                    <div className="friends">
                                        <img
                                            className="friends-avatar"
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
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
