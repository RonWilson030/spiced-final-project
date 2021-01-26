import io from "socket.io-client";
import {
    postNewMessage,
    getMessages,
    onlineUsers,
    userJoined,
    userLeft,
} from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("new message and user", (userAndMessage) => {
        store.dispatch(postNewMessage(userAndMessage));
    });

    socket.on("get messages", (messages) => {
        store.dispatch(getMessages(messages));
    });

    socket.on("online users", (users) => {
        console.log("online users: ", users);
        store.dispatch(onlineUsers(users));
    });

    socket.on("user joined", (user) => {
        console.log("user joined: ", userJoined);
        store.dispatch(userJoined(user));
    });

    socket.on("user left", (user) => {
        console.log("user left: ", userLeft);
        store.dispatch(userLeft(user));
    });
};
