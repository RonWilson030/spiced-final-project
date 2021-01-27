import { useSelector } from "react-redux";
import { socket } from "./socket";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Chat() {
    const [message, setMessage] = useState("");

    const chatMessages = useSelector((state) => state && state.messages);

    const onlineUsers = useSelector((state) => state && state.onlineUsers);

    const loggedInUser = useSelector((state) => state && state.loggedInUser);

    // console.log("online users chat: ", onlineUsers);
    // console.log("logged in user chat: ", loggedInUser);
    // console.log("messages: ", chatMessages);

    const toDateString = (isoDate) => {
        const date = new Date(isoDate).toLocaleDateString("en-gb", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        const time = new Date(isoDate).toLocaleTimeString("en-gb", {
            timeStyle: "short",
        });
        return `${date}, ${time}`;
    };

    const handleClick = () => {
        socket.emit("new chat message", message);
        setMessage("");
    };

    return (
        <div id="chat">
            <h3 className="list-title">
                Talk food tips, favourite recipes or any advice for your next
                dinner plans!
            </h3>
            <div className="online-users-container">
                <p>Online:</p>
                {onlineUsers &&
                    onlineUsers.map((user) => (
                        <div key={user.id}>
                            <Link to={`/users/${user.id}`}>
                                <img
                                    className="online-avatar"
                                    src={user.profile_pic || "/default.png"}
                                ></img>
                            </Link>
                        </div>
                    ))}
            </div>
            <div className="chat-container">
                {chatMessages.map((message) => (
                    <div
                        className={
                            message.user_id === loggedInUser
                                ? "chat-wrapper-user"
                                : "chat-wrapper-others"
                        }
                        key={message.id}
                    >
                        <div className="chat-content">
                            <Link to={`/users/${message.user_id}`}>
                                <img
                                    className="chat-avatar"
                                    src={message.profile_pic || "/default.png"}
                                ></img>
                            </Link>
                            <div>
                                {message.first} {message.last}
                                {":"}
                                <div className="chat-message">
                                    {'"'}
                                    {message.message}
                                    {'"'}
                                </div>
                                posted on {toDateString(message.timestamp)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-messenger">
                <p>Enter your message here:</p>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div>
                    <button className="hand-cursor" onClick={handleClick}>
                        Send Message
                    </button>
                </div>
            </div>
        </div>
    );
}
