import { useState } from "react";
import axios from "./axios";

export default function Extras() {
    const [trivia, setTrivia] = useState("");
    const [joke, setJoke] = useState("");
    const [category, setCategory] = useState("");

    const handleTrivia = () => {
        let abort;

        (async () => {
            const { data, status } = await axios.get("/api/search/trivia");
            if (!abort && status === 200) {
                console.log("trivia data: ", data);
                const { text } = data.result;
                setCategory("trivia");
                setTrivia(text);
            }
        })();

        return () => {
            abort = true;
        };
    };

    const handleJoke = () => {
        let abort;

        (async () => {
            const { data, status } = await axios.get("/api/search/joke");
            if (!abort && status === 200) {
                console.log("joke data: ", data);
                const { text } = data.result;
                setCategory("joke");
                setJoke(text);
            }
        })();

        return () => {
            abort = true;
        };
    };

    return (
        <div>
            <div id="extras">
                <div className="extra-container">
                    <div className="search-extras">
                        <button onClick={handleTrivia}>
                            Search for some random trivia!
                        </button>
                    </div>

                    <div className="search-extras">
                        <button onClick={handleJoke}>
                            Search for a random joke!
                        </button>
                    </div>
                </div>
                <div className="extras-results">
                    {category === "joke" ? <p>{joke}</p> : <p>{trivia}</p>}
                </div>
            </div>
        </div>
    );
}
