import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        // const otherUserId = this.props.match.params.id;
        axios
            .get("/api/users/last")
            .then((response) => {
                // console.log("users response", response);
                // console.log("users response: ", response.data);
                setUsers(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (!query) {
            setUsers([]);
            return;
        }

        let abort;

        (async () => {
            const { data } = await axios.get(`/api/users/search/?q=${query}`);
            if (!abort) {
                // console.log("response data: ", data);
                setUsers(data);
            }
        })();

        return () => {
            abort = true;
        };
    }, [query]);

    // console.log("********* RENDERING <FindPeople /> *************");
    return (
        <div>
            <div id="finder-container">
                <div id="finder-content">
                    <h2>Find your friends:</h2>
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="search friend..."
                    />
                    <h2>Recent friends:</h2>
                    <div>
                        {users &&
                            users.map((user) => (
                                <Link to={`/users/${user.id}`} key={user.id}>
                                    <div className="friends">
                                        <img
                                            id="friends-avatar"
                                            src={user.profile_pic}
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

// <div id="profile">
//     <img
//         id="profile-avatar"
//         className="hand-cursor"
//         // onClick={toggleUploader}
//         src={user.profilePic}
//         alt={`${user.first} ${user.last}`}
//     />
//     <div>
//         {user.first} {user.last}
//     </div>
// </div>;

//  {
//      /* {!users.length && id && <li>Nothing Found!</li>} */
//  }
