import io from "socket.io-client";
import { postNewMessage, addMostRecentMessages } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("new message and user", (userAndMessage) => {
        store.dispatch(postNewMessage(userAndMessage));
    });

    socket.on("10 most recent messages", (recentMessages) => {
        store.dispatch(addMostRecentMessages(recentMessages));
    });
};
