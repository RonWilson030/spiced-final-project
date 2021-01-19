export default function ProfilePic({
    toggleMenu,
    // toggleUploader,
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
                // onClick={toggleUploader}
                onClick={toggleMenu}
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
