import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import stringReplaceAll from 'string-replace-all';
class MediaStore extends Flux.DashStore{
    constructor(){
        super();
        this.addEvent("getWidgets", (data) => {
            // if (typeof data !== "undefined") {
            //     //let user = data;
                
            // }
            console.log("store");
            console.log(data);
            return Object.assign(data, {"widgets": []});
        });
        this.addEvent("postBookAction", (data) => {
            if (typeof data.content !== "undefined") {
                let content = data.content;
                let newString = stringReplaceAll(content, "'", '"');
                let pictures = JSON.parse(newString);
                return Object.assign(data, {"pictures": pictures});
            }
            return Object.assign(data, {"pictures": {}});
        });
    }
    
}
export default new MediaStore();