import axios from "./axios";

export async function getFriends() {
    const { data } = await axios.get("/get-friends");
    console.log("data get friendslist: ", data);
    return {
        type: "GET_FRIENDS",
        user: data.friendsList,
    };
}

export async function acceptRequest(otherUserId) {
    const { data } = await axios.post("/friendship/action", {
        action: "Accept Request",
        otherUserId,
    });
    // console.log("data accept request action: ", data);
    // console.log("action otherUserId: ", otherUserId);
    if (data.success) {
        return {
            type: "ACCEPT_REQUEST",
            acceptUser: otherUserId,
        };
    }
}

export async function unfriend(otherUserId) {
    const { data } = await axios.post("/friendship/action", {
        action: "Unfriend",
        otherUserId,
    });
    console.log("data unfriend action: ", data);
    console.log("unfriend otherUserId: ", otherUserId);
    if (data.success) {
        return {
            type: "UNFRIEND",
            unfriendUser: otherUserId,
        };
    }
}
