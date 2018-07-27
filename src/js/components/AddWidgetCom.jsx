import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
class AddWidgetCom extends React.Component {
    constructor() {
        super();
        this.state = {
            isBook: false,
            isYoutube: false,
            listOfVideos: [],
            hasVideos: false,
            isTextBox: false,
            showModal: false
        };
        this.addBook = this.addBook.bind(this);
        this.addVideo = this.addVideo.bind(this);
        this.addVideoToState = this.addVideoToState.bind(this);
        this.addTextBox = this.addTextBox.bind(this);
        this.saveWidgetHandler = this.saveWidgetHandler.bind(this);
    }
    
    componentDidMount() {
    }
    
    selectionChange(event) {
        let widgetSelector = document.querySelector("#widgetSelector");
        if (widgetSelector.value === "Book") {
            this.setState({isBook: true, isYoutube: false, isTextBox:false});
        }
        else if (widgetSelector.value === "YoutubePlayer") {
            this.setState({isBook: false, isYoutube: true, isTextBox:false});
        }
        else if (widgetSelector.value === "TextBox") {
            this.setState({isBook:false, isYoutube:false, isTextBox: true});
        }
        else if (widgetSelector.value === "None") {
            this.setState({isBook:false, isYoutube:false, isTextBox: false});
        }
    }
    
    addBook() {
        let picture1URL = document.querySelector("#picture1URL").value;
        let picture2URL = document.querySelector("#picture2URL").value;
        let author = document.querySelector("#bookAuthor").value;
        let title = document.querySelector("#bookTitle").value;
        let hasHTTP1 = picture1URL.startsWith("http");
        let hasHTTP2 = picture2URL.startsWith("http");
        let isIMG1 = picture1URL.endsWith(".jpeg") || picture1URL.endsWith(".jpg") || picture1URL.endsWith(".png") || picture1URL.endsWith(".gif");
        let isIMG2 = picture2URL.endsWith(".jpeg") || picture2URL.endsWith(".jpg") || picture2URL.endsWith(".png") || picture2URL.endsWith(".gif");
        if (hasHTTP1 && isIMG1 && hasHTTP2 && isIMG2) {
            if ((author!=="") && (title!=="")) {
                this.setState({showModal: true});
            }
        }
        else {
            alert("one or both of the images are invalid");
        }
    }
    
    addVideo() {
        let ytName = document.querySelector("#ytName").value;
        let ytArtist = document.querySelector("#ytArtist").value;
        let ytURL = document.querySelector("#ytURL").value;
        let checkURL = ytURL.startsWith("https://www.youtube.com/watch?v");
        if ((ytName !== "") && (ytArtist !== "") && (checkURL)) {
            this.props.addVideoToParent(ytName, ytArtist, ytURL);
            this.addVideoToState(ytName, ytArtist, ytURL);
            this.ytNameRef.value = "";
            this.ytArtistRef.value = "";
            this.ytURLRef.value = "";
        }
        else {
            alert("invalid form data");
        }
    }
    
    addVideoToState(ytName, ytArtist, ytURL) {
        let tempState = Object.assign(this.state.listOfVideos);
        tempState.push({name:ytName, artist:ytArtist, url:ytURL});
        this.setState({listOfVideos: tempState, hasVideos:true});
    }
    
    removeItem(e) {
        let id = e.target.id;
        let tempState = Object.assign(this.state.listOfVideos);
        tempState.splice(id, 1);
        this.setState({listOfVideos: tempState});
        this.props.removeItemFromParent(e);
    }
    
    addTextBox() {
        let link = document.querySelector("#articleLink").value;
        if (link.startsWith("http")) {
            this.setState({showModal: true});
        }
        else {
            alert("the input is not a link");
        }
    }
    
    saveWidgetHandler() {
        let user = this.state.user;
        let isBook = this.state.isBook;
        let isYoutube = this.state.isYoutube;
        let isTextBox = this.state.isTextBox;
        
        this.props.saveWidget(user, isBook, isYoutube, isTextBox);
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
        const divstyles = {
            borderTop: "aquamarine",
            borderWidth: "10px",
            borderStyle: "solid"
        };
        
    /* border-left: #103b5c; */

        const videos = this.state.listOfVideos.map((video,i) => {
            return <li className="list-group-item list-group-item-action" id={i} key={i} style={listItemStyle}>
            name: <b>{video.name}</b> / artist: <b>{video.artist}</b> / url: <b>{video.url}</b>
                <FontAwesomeIcon id={i} onClick={(e) => this.removeItem(e)} icon={faWindowClose} style={floatRightStyle}/>
            </li>;
        });
        return (
            <div className="card" >
                <div className="card-body textColorBlue" style={divstyles}>
                    <div className="text-center">
                        <h2 className="card-title">What type of widget do you want to add?</h2>
                        <select className="form-control d-inline-block mb-2 w-25" id="widgetSelector"
                        onChange={(event) => this.selectionChange(event)} name="widgetSelector" form="WidgetForm" >
                            <option value="None">None</option>
                            <option value="Book">Book</option>
                            <option value="YoutubePlayer">Youtube Player</option>
                            <option value="TextBox">Text Box</option>
                        </select>
                        {this.state.isBook ? (
                            <form>
                                <div className="form-row align-items-center justify-content-center">
                                    <div className="col-auto ">
                                        <label className="sr-only" htmlFor="Picture1URL">Picture 1 url</label>
                                        <input type="text" className="form-control mb-2 mr-sm-2" id="picture1URL" placeholder="Picture 1 url"/>
                                    </div>
                                    <div className="col-auto">
                                        <label className="sr-only" htmlFor="Picture2URL">Picture 2 url</label>
                                        <input type="text" className="form-control mb-2 mr-sm-2" id="picture2URL" placeholder="Picture 2 url"/>
                                    </div>
                                    <div className="col-auto ">
                                        <label className="sr-only" htmlFor="BookAuthor">Author</label>
                                        <input type="text" className="form-control mb-2 mr-sm-2" id="bookAuthor" placeholder="Author"/>
                                    </div>
                                    <div className="col-auto">
                                        <label className="sr-only" htmlFor="BookTitle">Title</label>
                                        <input type="text" className="form-control mb-2 mr-sm-2" id="bookTitle" placeholder="Title"/>
                                    </div>
                                    <div className="col-auto">
                                        <button type="button" className="btn btn-primary mb-2" onClick={this.addBook}>Add</button>
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
                                            <label className="sr-only" htmlFor="ytName">Name</label>
                                            <input ref={(el) => this.ytNameRef = el} type="text" className="form-control mb-2 mr-sm-2" id="ytName"  placeholder="Name"/>
                                        </div>
                                        <div className="col-auto">
                                            <label className="sr-only" htmlFor="ytArtist">Artist</label>
                                            <input ref={(el) => this.ytArtistRef = el} type="text" className="form-control mb-2 mr-sm-2" id="ytArtist" placeholder="Artist"/>
                                        </div>
                                        <div className="col-auto">
                                            <label className="sr-only" htmlFor="ytURL">Url</label>
                                            <input ref={(el) => this.ytURLRef = el} type="text" className="form-control mb-2 mr-sm-2" id="ytURL" placeholder="Youtube Url"/>
                                        </div>
                                        <div className="col-auto">
                                            <button type="button" className="btn btn-primary mb-2" id="addVideo" onClick={this.addVideo}>
                                            Add</button>
                                        </div>
                                        
                                    </div>
                                    {this.state.hasVideos ? (
                                        <button type="button" className="btn btn-success mb-2" id="ytSubmit" onClick= {() => this.setState({showModal: true})}>Submit</button>
                                        ) : ""}
                                </form>
                                
                            </div>
                        ) : ""}
                        {this.state.isTextBox ? (
                            <form>
                                <div className="form-row align-items-center justify-content-center">
                                    <div className="col-auto ">
                                        <label className="sr-only" htmlFor="articleLink">Link to article</label>
                                        <input type="text" className="form-control mb-2 mr-sm-2" id="articleLink" placeholder="Link to article"/>
                                    </div>
                                </div>
                                <textarea id="textArea" rows="8" cols="50">
                                    Write your own thoughts and opinions here. Or copy and paste the contents of an article.
                                </textarea><br/>
                                <button type="button" className="btn btn-success mb-2" onClick={this.addTextBox} id="textSubmit">Submit</button>
                            </form>
                        ) : ""}
                        {/*Modal*/}
                        <div className="modal" id="confirmModal" tabIndex="-1" role="dialog" style={{display: (this.state.showModal) ? 'inline-block' : 'none'}}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">What would you like to name the widget?</h5>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" name="widgetName" id="widgetName"/>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" onClick = {() => this.setState({showModal: false})}>Cancel</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick = {this.saveWidgetHandler}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Modal*/}
                    </div>
                </div>
            </div>
        );
    }
}
AddWidgetCom.propTypes = {
    addVideoToParent: PropTypes.func,
    removeItemFromParent: PropTypes.func,
    saveWidget: PropTypes.func
};
export default AddWidgetCom;