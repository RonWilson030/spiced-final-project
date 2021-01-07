import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    console.log("profile props: ", props);
    return (
        <div>
            <h1>userprofile component</h1>
            <h3>helo my name is {props.first}</h3>
            <ProfilePic />
            <BioEditor />
        </div>
    );
}
