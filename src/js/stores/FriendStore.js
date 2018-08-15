import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import stringReplaceAll from 'string-replace-all';
class FriendStore extends Flux.DashStore{
    constructor(){
        super();
        this.state = {
            friends: []
        };
        this.addEvent("getFriendsPending");
        this.addEvent("addFriend");
    }
    getFriendsFromStore() {
        console.log(this.state);
    }
}
export default new FriendStore();