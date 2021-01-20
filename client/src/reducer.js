const INITIAL_STATE = {
    users: [],
    messages: [],
};

// const users = (state = [], action) => {
//     const { type } = action;

//     switch (type) {
//         case "ACCEPT_REQUEST": {
//             return state.users.map((user) => {
//                 if (user.id == action.acceptUser) {
//                     return { ...user, accepted: true };
//                 } else {
//                     return user;
//                 }
//             });
//         }
//         default:
//             return state;
//     }
// };

// export default combinedReducers({ users })

export default function (state = INITIAL_STATE, action) {
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

    if (action.type == "UNFRIEND") {
        // console.log("reducer action unfriend log");
        state = {
            ...state,
            users: state.users.filter((user) => {
                return user.id != action.unfriendUser;
            }),
        };
    }

    if (action.type == "POST_NEW_MESSAGE") {
        console.log("chat messages");
        state = {
            ...state,
            messages: [...state.messages, action.userAndMessage],
        };
    }

    if (action.type == "RECENT_MESSAGES") {
        console.log("recent messages");
        state = {
            ...state,
            messages: action.recentMessages,
        };
    }

    return state;
}
