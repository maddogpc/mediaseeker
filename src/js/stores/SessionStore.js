import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
class SessionStore extends Flux.DashStore{
    constructor(){
        super();
        // Declare an Event
        this.addEvent("onLogout");
        // Or Declare an event with some imutable transformation logic
        /*this.addEvent("login", (state) => {
            // Do something with the data before propagating the Event
            console.log("in store");
            return Object.assign(state, {"key": "value"});
        });*/
        // Or Declare an event with some plain transformation logic
        this.addEvent("login", (auth) => {
            //console.log("in store");
            //console.log(state);
            //state.some_other_property = "Some other Data";
            return Object.assign(auth, {"user": auth, "auth": true});
        });
    }
}
export default new SessionStore();