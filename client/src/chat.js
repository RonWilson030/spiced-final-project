import { useSelector } from "react-redux";
import { socket } from "./socket";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Chat() {
    const [message, setMessage] = useState("");

    const chatMessages = useSelector((state) => state && state.messages);

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
            <div className="list-title">
                Talk food tips, favourite recipes or any advice for your next
                dinner plans!
            </div>
            <div className="chat-container">
                <div>
                    {chatMessages &&
                        chatMessages.map((user) => (
                            <div key={user.id}>
                                <div className="chat-content">
                                    <Link to={`/users/${user.id}`}>
                                        <img
                                            className="avatar"
                                            src={
                                                user.profile_pic ||
                                                "/default.png"
                                            }
                                        ></img>
                                    </Link>
                                    <div>
                                        {user.first} posted on{" "}
                                        {toDateString(user.timestamp)}
                                        {":"}
                                        <div>
                                            {'"'}
                                            {user.message}
                                            {'"'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
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
