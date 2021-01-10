import BioEditor from "./bioeditor";

export default function Profile({
    profilePic,
    first,
    last,
    setBio,
    bio,
    toggleUploader,
}) {
    // console.log("profile props: ", props);
    return (
        <div id="profile">
            <img
                id="profile-avatar"
                className="hand-cursor"
                onClick={toggleUploader}
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
