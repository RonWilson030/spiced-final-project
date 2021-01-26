import { useState, useEffect } from "react";
import axios from "./axios";

export default function AddFavouriteButton({ favouriteId }) {
    const [buttonText, setButtonText] = useState();

    // console.log("userId: ", userId);
    // console.log("otherUserId: ", otherUserId);

    // useEffect(() => {
    //     if (otherUserId && userId) {
    //         axios
    //             .get("/get-favourites")
    //             .then((response) => {
    //                 console.log("favourite status data: ", response);
    //                 const result = response.data.rows;
    //                 const text = favouriteStatusButtonText(
    //                     result,
    //                     userId,
    //                     otherUserId
    //                 );
    //                 setButtonText(text);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    // }, [otherUserId, userId]);

    const handleClick = () => {
        axios
            .post("/favourites/action/", {
                action: buttonText,
                favouriteId,
            })
            .then((result) => {
                console.log("post result: ", result);
                // const response = result.data.rows;
                // const text = favouriteStatusButtonText(
                //     response,
                //     userId,
                //     otherUserId
                // );
                // setButtonText(text);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <>
                <button onClick={handleClick}>{buttonText}</button>
            </>
        </>
    );
}

// function favouriteStatusButtonText(rows, userId) {
//     // const [{ recipient_id, sender_id, accepted } = {}] = rows;
//     // console.log("result: ", result);

//     if (rows.length === 0) {
//         return "Add Favourite";
//     } else if (accepted) {
//         return "Delete Favourite";
//     }
// }
