export default function ProfilePic({
    toggleUploader,
    profilePic,
    first,
    last,
}) {
    // console.log("props in profilepic: ", first, last, url);

    return (
        <div>
            <img
                id="avatar"
                className="hand-cursor"
                onClick={toggleUploader}
                src={profilePic}
                alt={`${first} ${last}`}
            />
        </div>
    );
}

// export default function ProfilePic(props) {
//     console.log("props in profilepic: ", props);
//     return (
//         <div>
//             <h1>
//                 ProfilePic: {props.first} {props.last}
//             </h1>
//         </div>
//     );
// }
