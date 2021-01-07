import ReactDOM from "react-dom";
// import Registration from "./registration";
import Welcome from "./welcome";
import App from "./app";

let element;
if (location.pathname === "/welcome") {
    element = <Welcome />;
} else {
    element = <App />;
}

// ReactDOM.render(<Registration />, document.querySelector("main"));
ReactDOM.render(element, document.querySelector("main"));
