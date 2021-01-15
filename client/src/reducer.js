export default function (state = {}, action) {
    if (action.type == "GET_USERS") {
        state = {
            ...state,
            users: action.users,
        };
    }

    if (action.type == "ACCEPT_REQUEST") {
        state = {
            ...state,
            users: state.users.map((user) => {
                user.id == action.acceptUser;
                return { ...user, accepted: true };
            }),
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            users: state.users.filter((user) => {
                user.id == action.unfriendUser;
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
