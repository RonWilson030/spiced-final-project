import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile({ url, first, last }) {
    // console.log("profile props: ", props);
    return (
        <div>
            <h1>userprofile component</h1>
            <h3>
                hello my name is {first} {last}
            </h3>
            <ProfilePic first={first} last={last} url={url} />
            <BioEditor />
        </div>
    );
}
