// import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>APPETITE!</h1>
            <img
                id="welcome-logo"
                src="http://spontaneoussmiley.com/wp-content/uploads/2011/01/Iconic-Yellow-Smiley.png"
                alt="appetite logo"
            />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/password/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
