import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import stringReplaceAll from 'string-replace-all';
class MediaStore extends Flux.DashStore{
    constructor(){
        super();
        this.state = {
            widgets: [],
            mediaShort: []
        };
        this.addEvent("getWidgets");
        this.addEvent("getWidgetFeed");
        this.addEvent("postBook");
        this.addEvent("postYoutube");
        this.addEvent("postTextBox");
        this.addEvent("getMediaShort", (state) => {
            let newState = this.state.mediaShort;
            if (Object.keys(state).length !== 0) {
                newState.push(state);
            }
            return Object.assign(this.state.mediaShort, newState);
        });
    }
    getWidgetsFromStore() {
        console.log(this.state);
    }
    getMediaShortFromStore() {
        return this.state.mediaShort;
    }
}
export default new MediaStore();