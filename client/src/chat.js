import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.messages);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("user pressed enter!");
            socket.emit("new chat message", e.target.value);
        }
    };

    return (
        <div>
            <h1>Welcome to the chatroom!</h1>
            <div className="chat-container">
                <p>dummy message...</p>
                {chatMessages &&
                    chatMessages.map((user) => (
                        <div key={user.id}>
                            <img
                                id="profile-avatar"
                                src={user.profile_pic || "/default.png"}
                            ></img>
                            {user.first} {user.last}
                            <p>{user.messages}</p>
                        </div>
                    ))}
                <textarea onKeyDown={handleKeyDown} />
            </div>
        </div>
    );
}
