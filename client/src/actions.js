import axios from "./axios";

export async function getShoppingList() {
    const { data } = await axios.get("/get-shoppinglist");
    console.log("data get list action: ", data);
    return {
        type: "GET_SHOPPINGLIST",
        shoppingList: data.shoppingList,
    };
}

export async function deleteShoppingItem(itemId) {
    const { data } = await axios.post("/shoppinglist/delete", {
        action: "deleteShoppingItem",
        itemId,
    });
    // console.log("data delete fave action: ", data);
    if (data.success) {
        return {
            type: "DELETE_SHOPPINGLISTITEM",
            deleteShoppingList: itemId,
        };
    }
}

export async function getFavourites() {
    const { data } = await axios.get("/get-favourites");
    // console.log("data get favourites action: ", data);
    return {
        type: "GET_FAVOURITES",
        favourites: data.favourites,
    };
}

export async function deleteFavourite(favouriteId) {
    const { data } = await axios.post("/favourites/delete", {
        action: "deleteFavourite",
        favouriteId,
    });
    // console.log("data delete fave action: ", data);
    if (data.success) {
        return {
            type: "DELETE_FAVOURITE",
            deleteFavourite: favouriteId,
        };
    }
}

export async function getFriends() {
    const { data } = await axios.get("/get-friends");
    // console.log("data get friendslist: ", data);
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

export async function disconnect(otherUserId) {
    const { data } = await axios.post("/friendship/action", {
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

export async function getMessages(messages) {
    // console.log("getMessages: ", messages);

    return {
        type: "LOAD_MESSAGES",
        messages: messages,
    };
}
