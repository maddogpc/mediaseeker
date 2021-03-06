import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
class SessionStore extends Flux.DashStore{
    constructor(){
        super();
        // Declare an Event
        this.addEvent("login");
        this.addEvent("search");
        this.addEvent("createProfile");
        this.addEvent("onLogout");
        this.addEvent("getFriends");
        this.addEvent("findRecommendedFriends");
    }
}
export default new SessionStore();