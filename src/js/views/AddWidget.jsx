import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import NavComponent from '../components/NavComp.jsx';
import AddWidgetCom from '../components/AddWidgetCom.jsx';
import SessionStore from '../stores/SessionStore.js';
import MediaActions from '../actions/MediaActions.js';
export default class AddWidget extends Flux.View {
    constructor() {
        super();
        this.state = {
            user: "",
            listOfVideos: []
        };
    }

    componentDidMount() {
        const storeState = SessionStore.getState();
        console.log(storeState);
        this.setState({user: storeState.login.username});
    }
    
    addVideoToParent(ytName, ytArtist, ytURL) {
        let tempState = Object.assign(this.state.listOfVideos);
        tempState.push({name:ytName, artist:ytArtist, url:ytURL});
        this.setState({listOfVideos: tempState});
    }
    
    removeItemFromParent(e) {
        let id = e.target.id;
        let tempState = Object.assign(this.state.listOfVideos);
        tempState.splice(id, 1);
        this.setState({listOfVideos: tempState});
    }
    
    saveWidget(user, isBook, isYoutube, isTextBox) {
        let userName = this.state.user;
        let widgetTitle = document.querySelector("#widgetName").value;
        if (isBook) {
            let mediaTitle = document.querySelector("#bookTitle").value;
            let mediaAuthor = document.querySelector("#bookAuthor").value;
            let picture1 = document.querySelector("#picture1URL").value;
            let picture2 = document.querySelector("#picture2URL").value;
            MediaActions.postBookAction(userName, mediaTitle, widgetTitle, mediaAuthor, picture1, picture2);
        }
        
        else if (isYoutube) {
            let listOfVideos = Object.assign(this.state.listOfVideos);
            MediaActions.postYoutubeAction(userName, widgetTitle, listOfVideos);
        }
        
        else if (isTextBox) {
            let link = document.querySelector("#articleLink").value;
            let textArea = document.querySelector("#textArea").value;
            MediaActions.postTextBoxAction(userName, widgetTitle, link, textArea);
        }
    }
    
    render() {
        return (
            <div>
                <NavComponent />
                <AddWidgetCom addVideoToParent={this.addVideoToParent.bind(this)} removeItemFromParent={this.removeItemFromParent.bind(this)}
                saveWidget={this.saveWidget.bind(this)}
                />
            </div>
        );
    }
}
