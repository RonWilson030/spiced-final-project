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
            {/* {query && <div></div>} */}
            <h2>Find your friends:</h2>
            <input
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Friend..."
            />
            {/* <ul>
                {users.map((user) => (
                    <li
                        className="hand-cursor"
                        key={user.id}
                        onClick={goToUserProfile}
                    >
                        {user.first}
                        {user.last}
                    </li>
                ))}
            </ul> */}
            <h2>Recent friends:</h2>
            <div>
                {users.map((user) => (
                    <Link to={`/users/${user.id}`} key={user.id}>
                        <div>
                            <img
                                id="profile-avatar"
                                src={user.profile_pic}
                            ></img>
                            {user.first} {user.last}
                        </div>
                    </Link>
                ))}
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
