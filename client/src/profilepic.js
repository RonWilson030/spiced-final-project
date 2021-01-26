import { Link } from "react-router-dom";

export default function ProfilePic({ profilePic, first, last }) {
    // console.log("props in profilepic: ", first, last, url);

    return (
        <>
            <Link to={`/profile`}>
                <img
                    id="avatar"
                    className="hand-cursor"
                    src={profilePic}
                    alt={`${first} ${last}`}
                />
            </Link>
        </>
    );
}
