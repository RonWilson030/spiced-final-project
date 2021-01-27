import Uploader from "./uploader";
import BioEditor from "./bioeditor";
import Favourites from "./favouriteRecipes";
import { useState } from "react";

export default function Profile({
    first,
    last,
    bio,
    profilePic,
    setBio,
    setImage,
}) {
    const [uploaderIsVisible, setUploaderIsVisible] = useState(false);

    const toggleUploader = () => {
        setUploaderIsVisible(!uploaderIsVisible);
    };

    return (
        <div id="profile">
            <div className="profile-container">
                <img
                    className="profile-avatar hand-cursor"
                    src={profilePic || "/default.png"}
                    alt={`${first} ${last}`}
                    onClick={toggleUploader}
                />
                {uploaderIsVisible && (
                    <Uploader
                        profilePic={profilePic || "default.png"}
                        setImage={setImage}
                        toggleUploader={toggleUploader}
                    />
                )}
                <div className="profile-content">
                    <p>About me:</p>
                    <div className="bio">{bio}</div>
                    <BioEditor currentBio={bio} setBio={setBio} />
                </div>
            </div>
            <Favourites />
        </div>
    );
}
