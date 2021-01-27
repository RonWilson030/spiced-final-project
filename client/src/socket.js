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

    socket.on("get messages", (messages, id) => {
        store.dispatch(getMessages(messages, id));
    });

    socket.on("online users", (users) => {
        console.log("online users: ", users);
        store.dispatch(onlineUsers(users));
    });

    socket.on("user joined", (user) => {
        console.log("user joined: ", user);
        store.dispatch(userJoined(user));
    });

    socket.on("user left", (user) => {
        console.log("user left: ", user);
        store.dispatch(userLeft(user));
    });
};
