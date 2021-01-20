export default function ProfilePic({ toggleMenu, profilePic, first, last }) {
    // console.log("props in profilepic: ", first, last, url);

    return (
        <>
            <img
                id="avatar"
                className="hand-cursor"
                onClick={toggleMenu}
                src={profilePic}
                alt={`${first} ${last}`}
            />
        </>
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
