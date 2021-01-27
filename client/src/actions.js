import axios from "./axios";

export async function getShoppingList() {
    const { data } = await axios.get("/api/shoppinglist");
    console.log("data get list action: ", data);
    return {
        type: "SET_SHOPPINGLIST",
        shoppingList: data.shoppingList,
    };
}

export async function addShoppingListItem(item) {
    return {
        type: "ADD_SHOPPINGLIST_ITEM",
        item,
    };
}

export async function deleteShoppingItem(id) {
    const { data } = await axios.delete(`/api/shoppinglist/${id}`);
    // console.log("data delete fave action: ", data);
    if (data.success) {
        return {
            type: "DELETE_SHOPPINGLISTITEM",
            deleteShoppingList: id,
        };
    }
}

export async function getFavourites() {
    const { data } = await axios.get("/api/favourites");
    // console.log("data get favourites action: ", data);
    return {
        type: "GET_FAVOURITES",
        favourites: data.favourites,
    };
}

export async function deleteFavourite(id) {
    const { data } = await axios.delete(`/api/favourites/${id}`);
    // console.log("data delete fave action: ", data);
    if (data.success) {
        return {
            type: "DELETE_FAVOURITE",
            deleteFavourite: id,
        };
    }
}

export async function getFriends() {
    const { data } = await axios.get("/api/friends");
    // console.log("data get friendslist: ", data);
    return {
        type: "GET_FRIENDS",
        user: data.friendsList,
    };
}

export async function acceptRequest(otherUserId) {
    const { data } = await axios.post("/api/friendship/action", {
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

export async function disconnect(otherUserId) {
    const { data } = await axios.post("/api/friendship/action", {
        action: "disconnect",
        otherUserId,
    });
    // console.log("data unfriend action: ", data);
    // console.log("unfriend otherUserId: ", otherUserId);
    if (data.success) {
        return {
            type: "DISCONNECT",
            disconnectUser: otherUserId,
        };
    }
}

export async function postNewMessage(userAndMessage) {
    // console.log("userMessage: ", userAndMessage);

    return {
        type: "POST_NEW_MESSAGE",
        userAndMessage: userAndMessage,
    };
}

export async function getMessages(messages, id) {
    // console.log("getMessages: ", messages);
    // console.log("message user id: ", id);

    return {
        type: "LOAD_MESSAGES",
        messages: messages,
        loggedInUser: id,
    };
}

export async function onlineUsers(onlineUsers) {
    // console.log("onlineUsers: ", onlineUsers);

    return {
        type: "ONLINE_USERS",
        onlineUsers: onlineUsers,
    };
}

export async function userJoined(userJoined) {
    // console.log("user joined: ", userJoined);

    return {
        type: "USER_JOINED",
        userJoined: userJoined,
    };
}

export async function userLeft(userLeft) {
    console.log("user left: ", userLeft);

    return {
        type: "USER_LEFT",
        id: userLeft,
    };
}
