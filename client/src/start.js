import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import reduxPromise from "redux-promise";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let element;
if (location.pathname === "/welcome") {
    element = <Welcome />;
} else {
    element = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(element, document.querySelector("main"));
