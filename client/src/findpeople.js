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
        <div>
            <div id="finder-container">
                <div id="finder-content">
                    <h2>Find someone:</h2>
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="search friend..."
                    />
                    <div>
                        {users &&
                            users.map((user) => (
                                <Link to={`/users/${user.id}`} key={user.id}>
                                    <div className="friends">
                                        <img
                                            id="friends-avatar"
                                            src={
                                                user.profile_pic ||
                                                "/default.png"
                                            }
                                        ></img>
                                        <div id="name-style">
                                            {user.first} {user.last}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
