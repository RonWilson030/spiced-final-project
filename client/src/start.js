import ReactDOM from "react-dom";
// import HelloWorld from "./helloWorld";
// import Registration from "./registration";
import Welcome from "./welcome";

let element;
if (location.pathname === "/welcome") {
    element = <Welcome />;
} else {
    element = <p>homepage</p>;
}

// ReactDOM.render(<Registration />, document.querySelector("main"));
ReactDOM.render(element, document.querySelector("main"));
