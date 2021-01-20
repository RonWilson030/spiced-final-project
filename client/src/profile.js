export default function Profile({ profilePic, first, last, bio, toggleMenu }) {
    // console.log("profile props: ", props);
    return (
        <div id="profile">
            <img
                id="profile-avatar"
                onClick={toggleMenu}
                src={profilePic}
                alt={`${first} ${last}`}
            />
            <div id="profile-info">
                <>
                    {first} {last}
                </>
                <div id="bio-text">{bio}</div>
            </div>
        </div>
    );
}
