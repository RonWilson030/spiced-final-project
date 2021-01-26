import io from "socket.io-client";
import { postNewMessage, getMessages } from "./actions";

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
};
