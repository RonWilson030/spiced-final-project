// import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";

export default function Welcome() {
    return (
        <div id="welcome">
            <div className="welcome-wrapper">
                <h1>APPETITE!</h1>
                <h3>The little app for foodies...</h3>

                <p>
                    Discover endless recipes and connect with other hungry
                    tastebuds!
                </p>
            </div>
            <div className="welcome-container">
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route
                            path="/password/reset"
                            component={ResetPassword}
                        />
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}
