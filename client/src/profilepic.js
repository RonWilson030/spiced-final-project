export default function ProfilePic({ toggleUploader, url, first, last }) {
    console.log("props in profilepic: ", first, last);
    return (
        <div>
            <img
                id="avatar"
                onClick={toggleUploader}
                src={url}
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
