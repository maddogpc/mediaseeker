import SessionStore from '../stores/SessionStore.js';
import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
    export class SessionComponent extends Flux.View{
        constructor(){
            super();
            // start listening to changes on SessionStore for especific event
            this.bindStore(SessionStore,'EVENT_NAME', function(){
                // retreive any store data
                var isAuthenticated = SessionStore.getAutentication();
                alert(isAuthenticated);
            });
            
            // start listening to changes on SessionStore
            this.bindStore(SessionStore, function(){
                // retreive any store data
                //var isAutenticated = SessionStore.getAutentication();
            });
        }
        render() {
        return (
            <h1>Blank</h1>
        );
      }
    }
    