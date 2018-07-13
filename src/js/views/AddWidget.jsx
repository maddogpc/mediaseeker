import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import MediaStore from '../stores/MediaStore.js';
import MediaActions from '../actions/MediaActions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
export default class AddWidget extends Flux.View {
    constructor() {
        super();
        this.saveWidget = this.saveWidget.bind(this);
        this.state = {
            showModal: false,
            isBook: false,
            isYoutube: false,
            isTextBox: false,
            listOfVideos: [],
            hasVideos: false
        };
    }
    /*
    componentDidMount() {
        const me = this;
        console.log(me);
        this.mediaSubscription = MediaStore.subscribe("postWidgetAction", (state) => {
            // Do something usefull with the Event Data
            //me.userName = state.user.name;
            console.log("postWidgetAction");
        });
        // Register some method
        //this.logoutSubscription = SessionStore.subscribe("logout", this.logOutEvent.bind(this));
    }
    */
    componentDidMount() {
        //const me = this;
        //console.log(me);
        this.mediaSubscription = MediaStore.subscribe("postBookAction", (data) => {
            // Do something usefull with the Event Data
            //me.userName = state.user.name;
            console.log("postBookAction");
        });
        // Register some method
        //this.logoutSubscription = SessionStore.subscribe("logout", this.logOutEvent.bind(this));
    }
    
    selectionChange(event) {
        if (this.selectRef.value === "Book") {
            this.setState({isBook: true, isYoutube: false, isTextBox:false});
        }
        else if (this.selectRef.value === "YoutubePlayer") {
            this.setState({isBook: false, isYoutube: true, isTextBox:false});
        }
        else if (this.selectRef.value === "TextBox") {
            this.setState({isBook:false, isYoutube:false, isTextBox: true});
        }
        else if (this.selectRef.value === "None") {
            this.setState({isBook:false, isYoutube:false, isTextBox: false});
        }
    }
    
    addVideo() {
        let tempState = Object.assign(this.state.listOfVideos);
        let formName = this.nameRef.value;
        let formArtist = this.artistRef.value;
        let formURL = this.urlRef.value;
        let checkURL = formURL.startsWith("https://www.youtube.com/watch?v");
        if ((formName !== "") && (formArtist !== "") && (checkURL)) {
            tempState.push({name:formName, artist:formArtist, url:formURL});
            this.setState({listOfVideos: tempState, hasVideos:true});
            this.nameRef.value = "";
            this.artistRef.value = "";
            this.urlRef.value = "";
        }
        else {
            alert("invalid form data");
        }
    }
    
    addBook() {
        let url1 = this.picture1Ref.value;
        let url2 = this.picture2Ref.value;
        let author = this.authorRef.value;
        let title = this.titleRef.value;
        let hasHTTP1 = url1.startsWith("http");
        let hasHTTP2 = url2.startsWith("http");
        let isIMG1 = url1.endsWith(".jpg") || url1.endsWith(".png") || url1.endsWith(".gif");
        let isIMG2 = url2.endsWith(".jpg") || url2.endsWith(".png") || url2.endsWith(".gif");
        if (hasHTTP1 && isIMG1 && hasHTTP2 && isIMG2) {
            if ((author!=="") && (title!=="")) {
                this.setState({showModal: true});
            }
        }
        else {
            alert("one or both of the images are invalid");
        }
    }
    
    addTextBox() {
        let link = this.linkArticleRef.value;
        if (link.startsWith("http")) {
            this.setState({showModal: true});
        }
        else {
            alert("the input is not a link");
        }
    }
    
    removeItem(e) {
        let id = e.target.id;
        let tempState = Object.assign(this.state.listOfVideos);
        tempState.splice(id, 1);
        this.setState({listOfVideos: tempState});
    }
    
    saveWidget() {
        //alert("save");
        console.log(this.state.isBook);
        if (this.state.isBook) {
            //MediaActions.postWidgetAction("user", "test");
            let widgetTitle = this.widgetTitleRef.value;
            let mediaTitle = this.titleRef.value;
            let author = this.authorRef.value;
            let picture1 = this.picture1Ref.value;
            let picture2 = this.picture2Ref.value;
            MediaActions.postBook(widgetTitle, mediaTitle, author, picture1, picture2);
        }
        //MediaActions.postWidgetAction("this.state.username", "this.state.password");
    }
    
    render() {
        const listItemStyle = {
            listStyleType: "none",
            maxWidth: "720px",
            margin: "auto",
            marginBottom: "8px"
        };
        const floatRightStyle = {
            float: "right",
            fontSize: "30px"
        };
        const videos = this.state.listOfVideos.map((video,i) => {
            return <li className="list-group-item list-group-item-action" id={i} key={i} style={listItemStyle}>
            name: <b>{video.name}</b> / artist: <b>{video.artist}</b> / url: <b>{video.url}</b>
                <FontAwesomeIcon id={i} onClick={(e) => this.removeItem(e)} icon={faWindowClose} style={floatRightStyle}/>
            </li>;
        });
        return (
            <div className="text-center">
                <h2>What type of widget do you want to add?</h2>
                <select className="form-control d-inline-block mb-2 w-25" ref={(el) => this.selectRef = el} onChange={(event) => this.selectionChange(event)} name="WidgetType" form="WidgetForm" >
                    <option value="None">None</option>
                    <option value="Book">Book</option>
                    <option value="YoutubePlayer">Youtube Player</option>
                    <option value="TextBox">Text Box</option>
                </select>
                {this.state.isBook ? (
                    <form>
                        <div className="form-row align-items-center justify-content-center">
                            <div className="col-auto ">
                                <label className="sr-only" htmlFor="FirstInput">Picture 1 url</label>
                                <input ref={(el) => this.picture1Ref = el} type="text" className="form-control mb-2 mr-sm-2" id="FirstInput" placeholder="Picture 1 url"/>
                            </div>
                            <div className="col-auto">
                                <label className="sr-only" htmlFor="SecondInput">Picture 2 url</label>
                                <input ref={(el) => this.picture2Ref = el} type="text" className="form-control mb-2 mr-sm-2" id="SecondInput" placeholder="Picture 2 url"/>
                            </div>
                            <div className="col-auto ">
                                <label className="sr-only" htmlFor="FirstInput">Author</label>
                                <input ref={(el) => this.authorRef = el} type="text" className="form-control mb-2 mr-sm-2" id="FirstInput" placeholder="Author"/>
                            </div>
                            <div className="col-auto">
                                <label className="sr-only" htmlFor="SecondInput">Title</label>
                                <input ref={(el) => this.titleRef = el} type="text" className="form-control mb-2 mr-sm-2" id="SecondInput" placeholder="Title"/>
                            </div>
                            <div className="col-auto">
                                <button onClick={() => this.addBook()} type="button" className="btn btn-primary mb-2">Add</button>
                            </div>
                        </div>
                    </form>    
                ) : ""}
                {this.state.isYoutube ? (
                    <div>
                        <ul className="list-group mx-auto" id="VideoList">{videos}</ul>
                        <form>
                            <div className="form-row align-items-center justify-content-center">
                                <div className="col-auto ">
                                    <label className="sr-only" htmlFor="FirstInput">Name</label>
                                    <input ref={(el) => this.nameRef = el} type="text" className="form-control mb-2 mr-sm-2" id="FirstInput" placeholder="Name"/>
                                </div>
                                <div className="col-auto">
                                    <label className="sr-only" htmlFor="SecondInput">Artist</label>
                                    <input ref={(el) => this.artistRef = el} type="text" className="form-control mb-2 mr-sm-2" id="SecondInput" placeholder="Artist"/>
                                </div>
                                <div className="col-auto">
                                    <label className="sr-only" htmlFor="ThirdInput">Url</label>
                                    <input ref={(el) => this.urlRef = el} type="text" className="form-control mb-2 mr-sm-2" id="ThirdInput" placeholder="Youtube Url"/>
                                </div>
                                <div className="col-auto">
                                    <button onClick={() => this.addVideo()} type="button" className="btn btn-primary mb-2">Add</button>
                                </div>
                                
                            </div>
                            {this.state.hasVideos ? (
                                <button onClick={() => this.setState({showModal: true})} type="button" className="btn btn-success mb-2">Submit</button>
                                ) : ""}
                        </form>
                        
                    </div>
                ) : ""}
                {this.state.isTextBox ? (
                    <form>
                        <div className="form-row align-items-center justify-content-center">
                            <div className="col-auto ">
                                <label className="sr-only" htmlFor="FirstInput">Link to article</label>
                                <input ref={(el) => this.linkArticleRef = el} type="text" className="form-control mb-2 mr-sm-2" id="FirstInput" placeholder="Link to article"/>
                            </div>
                        </div>
                        <textarea ref={(el) => this.textAreaRef = el} rows="8" cols="50">
                            Write your own thoughts and opinions here.
                        </textarea><br/>
                        <button onClick={() => this.addTextBox()} type="button" className="btn btn-success mb-2">Submit</button>
                    </form>
                ) : ""}
                {/*Modal*/}
                <div className="modal" tabIndex="-1" role="dialog" style={{display: (this.state.showModal) ? 'inline-block' : 'none'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">What would you like to name the widget?</h5>
                            </div>
                            <div className="modal-body">
                                <input type="text" name="playlistname" ref={(el) => this.widgetTitleRef = el}/>
                            </div>
                            <div className="modal-footer">
                                <button onClick = {() => this.setState({showModal: false})} type="button" className="btn btn-primary">Cancel</button>
                                <button onClick = {this.saveWidget} type="button" className="btn btn-secondary" data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*End Modal*/}
            </div>
            
            
            
        );
    }
}
