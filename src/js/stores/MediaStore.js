import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import stringReplaceAll from 'string-replace-all';
class MediaStore extends Flux.DashStore{
    constructor(){
        super();
        this.state = {
            widgets: []
        };
        this.addEvent("getWidgets");
        this.addEvent("postBook");
        this.addEvent("postYoutube");
        this.addEvent("postTextBox");
        // this.addEvent("postBook", (state) => {
        //     console.log(state);
        //     // state.some_other_property = "Some other Data";
        //     return Object.assign(state, state);
        // });
    }
    getWidgetsFromStore() {
        console.log(this.state);
    }
}
export default new MediaStore();