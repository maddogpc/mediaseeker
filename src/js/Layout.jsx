import React from 'react';
import Flux from "@4geeksacademy/react-flux-dash";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Profile from "./views/Profile.jsx";
import AddWidget from "./views/AddWidget.jsx";
import SessionComponent from "./views/SessionComponent.jsx";
export default class Layout extends Flux.View {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="container-fluid">
                        <Switch>
                            {/*<Route exact path="/index.html" component={Home} />
                            <Route exact path="/" component={Home} />
                            <Route exact path="/home" component={Home} />*/}
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/addwidget" component={AddWidget} />
                            <Route exact path="/sessioncomponent" component={SessionComponent} />
                            <Route exact path="/add" component={AddWidget} />
                            <Route render={() => <h1>Not found!</h1>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
