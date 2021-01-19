import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat() {
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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("new chat message", e.target.value);
            e.target.value = "";
        }
    };

    // console.log("chat messages: ", chatMessages);

    return (
        <div id="chat">
            <h1>Welcome to the chatroom!</h1>
            <div className="chat-container">
                <div>
                    {chatMessages &&
                        chatMessages.map((messenger) => (
                            <div key={messenger.id}>
                                <div className="chat-content">
                                    <img
                                        className="avatar"
                                        src={
                                            messenger.profile_pic ||
                                            "/default.png"
                                        }
                                    ></img>
                                    <div>
                                        {messenger.first} {messenger.last}{" "}
                                        posted on{" "}
                                        {toDateString(messenger.timestamp)}{" "}
                                        {":"}
                                        <div>
                                            {'"'}
                                            {messenger.message}
                                            {'"'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div>
                <p>Enter your message here:</p>
                <textarea onKeyDown={handleKeyDown} />
            </div>
        </div>
    );
}
