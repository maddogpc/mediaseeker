import React from 'react';
import Flux from "@4geeksacademy/react-flux-dash";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./views/Home.jsx";
import Profile from "./views/Profile.jsx";
import Media from "./views/Media.jsx";
import RecFriends from "./views/RecFriends.jsx";
import TableTest from "./views/TableTest.jsx";
import Wizard from "./views/Wizard.jsx";
import Feed from "./views/Feed.jsx";
import NewAccount from "./views/NewAccount.jsx";
export default class Layout extends Flux.View {
    
    render() {
        const expanded = {
            paddingRight: 0,
            paddingLeft: 0
        };
        return (
            <div className="container-fluid expanded" style={expanded}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/index.html" component={Home} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/media" component={Media} />
                        <Route exact path="/recfriends" component={RecFriends} />
                        <Route exact path="/tabletest" component={TableTest} />
                        <Route exact path="/adduser" component={NewAccount} />
                        <Route exact path="/wizard" component={Wizard} />
                        <Route exact path="/feed" component={Feed} />
                        <Route exact path="/profile/:username" component={Profile} />
                        <Route render={() => <h1>Not found!</h1>} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
