const INITIAL_STATE = {
    favourites: [],
    users: [],
    messages: [],
    shoppingList: [],
    onlineUsers: [],
    loggedInUser: [],
};

export default function (state = INITIAL_STATE, action) {
    if (action.type == "GET_FAVOURITES") {
        state = {
            ...state,
            favourites: action.favourites,
        };
    }

    if (action.type == "DELETE_FAVOURITE") {
        state = {
            ...state,
            favourites: state.favourites.filter((item) => {
                return item.id != action.deleteFavourite;
            }),
        };
    }

    if (action.type == "SET_SHOPPINGLIST") {
        state = {
            ...state,
            shoppingList: action.shoppingList,
        };
    }

    if (action.type == "ADD_SHOPPINGLIST_ITEM") {
        state = {
            ...state,
            shoppingList: [...state.shoppingList, action.item],
        };
    }

    if (action.type == "DELETE_SHOPPINGLISTITEM") {
        state = {
            ...state,
            shoppingList: state.shoppingList.filter((item) => {
                return item.id != action.deleteShoppingList;
            }),
        };
    }

    if (action.type == "GET_FRIENDS") {
        state = {
            ...state,
            users: action.user,
        };
    }

    if (action.type == "ACCEPT_REQUEST") {
        // console.log("reducer action accept request log");
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id == action.acceptUser) {
                    return { ...user, accepted: true };
                } else {
                    return user;
                }
            }),
        };
    }

    if (action.type == "DISCONNECT") {
        // console.log("reducer action diconnect log");
        state = {
            ...state,
            users: state.users.filter((user) => {
                return user.id != action.disconnectUser;
            }),
        };
    }

    if (action.type == "POST_NEW_MESSAGE") {
        // console.log("chat messages");
        state = {
            ...state,
            messages: [...state.messages, action.userAndMessage],
        };
    }

    if (action.type == "LOAD_MESSAGES") {
        // console.log("recent messages");
        state = {
            ...state,
            messages: action.messages,
            loggedInUser: action.loggedInUser,
        };
    }

    if (action.type == "ONLINE_USERS") {
        state = {
            ...state,
            onlineUsers: action.onlineUsers,
        };
    }

    if (action.type == "USER_JOINED") {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.userJoined],
        };
    }

    if (action.type == "USER_LEFT") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter((user) => {
                return user.id != action.id;
            }),
        };
    }

    return state;
}
