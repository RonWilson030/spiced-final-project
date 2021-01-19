import BioEditor from "./bioeditor";

export default function Bio({
    profilePic,
    first,
    last,
    setBio,
    bio,
    toggleMenu,
}) {
    // console.log("profile props: ", props);
    return (
        <div id="profile">
            <img
                id="profile-avatar"
                className="hand-cursor"
                onClick={toggleMenu}
                src={profilePic}
                alt={`${first} ${last}`}
            />
            <div id="profile-info">
                <div>
                    {first} {last}
                </div>
                <div id="bio-text">{bio}</div>
                <BioEditor currentBio={bio} setBio={setBio} />
            </div>
        </div>
    );
}
