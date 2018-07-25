import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
class SessionStore extends Flux.DashStore{
    constructor(){
        super();
        // Declare an Event
        this.addEvent("login");
        this.addEvent("createProfile");
        this.addEvent("onLogout");
    }
}
export default new SessionStore();