import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendshipButton({ userId, otherUserId }) {
    const [buttonText, setButtonText] = useState();

    // console.log("userId: ", userId);
    // console.log("otherUserId: ", otherUserId);

    useEffect(() => {
        if (otherUserId && userId) {
            axios
                .get(`/api/friendship/status/${otherUserId}`)
                .then((response) => {
                    // console.log("friendship status data: ", response);
                    const result = response.data.rows;
                    const text = friendsStatusButtonText(
                        result,
                        userId,
                        otherUserId
                    );
                    setButtonText(text);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [otherUserId, userId]);

    const handleClick = () => {
        axios
            .post("/api/friendship/action/", {
                action: buttonText,
                otherUserId,
            })
            .then((result) => {
                // console.log("post result: ", result);
                const response = result.data.rows;
                const text = friendsStatusButtonText(
                    response,
                    userId,
                    otherUserId
                );
                setButtonText(text);
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

function friendsStatusButtonText(rows, userId) {
    const [{ recipient_id, sender_id, accepted } = {}] = rows;
    // console.log("result: ", result);

    if (rows.length === 0) {
        return "Make Request";
    } else if (accepted) {
        return "Unfriend";
    } else if (recipient_id === userId) {
        return "Accept Request";
    } else if (sender_id === userId) {
        return "Cancel Request";
    }
}
