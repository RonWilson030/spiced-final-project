export default function (state = {}, action) {
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
        console.log("reducer action unfriend log");
        state = {
            ...state,
            users: state.users.filter((user) => {
                return user.id != action.unfriendUser;
            }),
        };
    }

    return state;
}

// const obj = {
//     first: "Ron",
// };

// const newObj = {
//     ...obj,
//     last: "Wilson",
// };

// if (action.type == "MAKE_HOT") {
//     state = {
//         ...state,
//         users: state.users.map((user) => {
//             if (user.id == action.id) {
//                 return {
//                     ...user,
//                     hot: true,
//                 };
//             } else {
//                 return user;
//             }
//         }),
//     };
// }
