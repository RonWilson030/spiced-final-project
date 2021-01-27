// import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";

export default function Welcome() {
    return (
        <div id="welcome">
            <header className="header-section">
                <div className="main-title">
                    <div>
                        <i className="fas fa-pizza-slice"></i>
                    </div>
                    <div>
                        <i className="fas fa-carrot"></i>
                    </div>
                    <div>
                        <i className="fas fa-fish"></i>
                    </div>
                    <div>APPETITE!</div>
                    <div>
                        <i className="fas fa-cheese"></i>
                    </div>
                    <div>
                        <i className="fas fa-drumstick-bite"></i>
                    </div>
                    <div>
                        <i className="fas fa-pepper-hot"></i>
                    </div>
                </div>
            </header>
            <div className="welcome-wrapper">
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
