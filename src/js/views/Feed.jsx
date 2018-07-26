import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import MediaSelectorComp from '../components/MediaSelCom.jsx';
import CardComponent from '../components/CardCom.jsx';
import NavComponent from '../components/NavComp.jsx';
import SnipIt from '../components/chatCard.jsx';
import Modal from '../components/modal.js';
import SessionStore from '../stores/SessionStore.js';
import MediaActions from '../actions/MediaActions.js';
import AddWidgetCom from '../components/AddWidgetCom.jsx';
import LoginStore from '../stores/LoginStore.js';
import MsgCom from '../components/MsgCom.jsx';
import MediaStore from '../stores/MediaStore.js';
import YTplayer from "../components/YTplayer.jsx";
import FlipCover from "../components/FlipCover.jsx";
import TextBox from "../components/TextBox.jsx";
import Masonry from 'react-masonry-component';

export default class Feed extends Flux.View {
    constructor() {
        super();
        this.state = {
            users:LoginStore.getUser(),
            user: "",
            listOfVideos: [],
            message:"",
            messages:[],
            ws: new WebSocket('wss://eassy-chat-grayulv.c9users.io', "echo-protocol"),
            widgetsInHTML: [],
            currentPlayer: "",
            toggle: false
        };
    }
    componentDidMount(){
        const storeState = SessionStore.getState();
        console.log(storeState);
        //chat
        var socket = this.state.ws;
        //this.setState({socket});
        // Connection opened
        socket.addEventListener('open', function (event) {
            socket.send('Hello Server!, for the second time');
        });
    
        // Listen for messages
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });
        socket.onmessage = event => {
            this.updateMsgList(event.data); //or wherever your new anim data is in the event    
        };
        
        // this.setState({user: storeState.login.username});
        this.bindStore(LoginStore,()=> {
            console.log('final step');
            // this.props.history.push('/contacts');
            this.setState({
                users: LoginStore.getUser()
            });
        });
        this.mediaSubscription = MediaStore.subscribe("getWidgets", (data) => {
            this.setState({widgets: data});
        });
        MediaActions.getWidgets(storeState.login.username);
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
    // chat function
    updateMsgList(msg){
        let newList= this.state.messages;
        newList.push(msg);
        this.setState({messages:newList});
    }
    message(){
        let socket = this.state.ws;
        socket.send(this.state.message);
        // let newList= this.state.messages;
        // newList.push(this.state.message);
        // this.setState({messages:newList})
    }
    // widgets
    parentUpdate(playerID) {
        this.setState({currentPlayer: playerID ? playerID : ""});
    }
    
    toggle() {
        this.setState({toggle: !this.state.toggle});
    }
    
  render() {
    if (this.state.widgets !== undefined && this.state.widgets.length !== 0) {
        const widgets = Object.assign(this.state.widgets);
        var widgetsInHTML = widgets.map((widget,i) => {
            if (widget.widget_type === "youtube") {
                let parsedVideos = JSON.parse(widget.content);
                return <YTplayer currentPlayer={this.state.currentPlayer} parentUpdate={(id) => this.parentUpdate(id)} ID={"uniqueID"+i} title={widget.title} videos={parsedVideos} key={i+100}/>;
            }
            else if (widget.widget_type === "book") {
                let parsedImages = JSON.parse(widget.content);
                return <FlipCover id={"flipper"+i} sizes={widget.image_size} images={parsedImages} key={i+200}/>;
            }
            else if (widget.widget_type === "textarea") {
                return <TextBox toggle={() => this.toggle()} title={widget.title} link={widget.link} text={widget.content} key={i+300}/>;
            }
        });
    }
    const SnipItInHTML = this.state.users.map((users,i) => {
            return <SnipIt 
                        key={i}     
                        name ={users.name} 
                        email={users.email} 
                        imgUrl={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP0AAADHCAMAAADlCqUFAAAAFVBMVEXMzMzb29vOzs7Z2dnW1tbR0dHU1NT2HhYqAAAD60lEQVR4nO2dybLrIAxEPf//J9+AU5XEL5Vng9pwQGeTbdqSWgI8DIPjOI7jOI7jOI7jOE4iU2Rd1/hb+t/cx0Pysszz+M68bGv7l2Dalk/ZH5dga/kCTD+UP1nW0n9SwwnpewI0qH9dTknf41/6zxozXdAewt9S+V/U3pb89ar2saHkvxz4SBu9bzpn9F/jj78CU7L2CHv8yRQfMwCr30D8g620jDRsxFP7X5rbfwM4/G5m4oHyrfKeKT+90TcgP2W+/QXK+mzzPkAa/S0t7wkn9+1D/8j90qJOY131EUzwjQ1/hxJ8ReKPmOALPC8AsX1J4j8oresUosSHpL7E8QOI1Ldb2h5AuL6q7McRMOzLyh5R+LKyR+zxibp9AGB7MtPrXT1gj6Nv9bqGB2h5wobn6ivH1bt6V+/qXb2rd/Xtqx+E4uvf2sq4Re+/AFa4fav33Q0Rfe/r9b2nW3/D61y9btypv90r1QMsX9jwAZYvbHkAyxe2PIDp6UyfYHo620OYnmyNizA9me0hyl5le4AjzIjG9iBlL7I9SNmLpj1I4mtsj9HtA4rCp5S9pvAxiS+JPWKJE9B0PIh81ZzPyH3V+h7he7qdLULwdfv5hGlPd5ZDSH3dKSZglae8e8HV143y7oX61Qtdj7DM69vz++73uhNswjqn70lXVvgE09MVPqHse1/fi1Kf0O8CmuATHD+iCD4l9INilcsw/B3zpQ5gaf/G9Rco/wT3ctHJbuJFfljAKvtJJf/CKvlBbv+G1cTLmHCPWA09mDHnAyv1RM8brAqfaXpWhc8se6vUhya+TcenJr7NBic18W1SH5v4Fq7PTXyL1GeOOk9yfY+1rj+SG3yu50Uyg1/672eSF3x46DNtH131gZyejzb8nfS1DnNT50Cy8eHzPpCa+w3kfSDN95vI+0DX30dMkY/v9G9cL/1Gij7i6l29q3f1fam//joGV98Mrt7Vd6m+b8939a7e1Z+j7/V9S+qv7+00tLHl6jtWf/08pyX1CUeZTRzkRFJOc9pp+Emn2K0EP+0kq5WOn3iI20bwk+/eaEF++q0r7NvVIjn37dDl5z6Xh5bf9Z2qFg9n4B7DfLIaPY5IDL/hk7gzTb/1U8gk/cbaA5j4r5r3bsyAR7EnK6/7pn+rW78g5T+p1wCUYX9RZwFMwm+jHagtAe4J+4uaHEBe7d+oYwK+O+wvyjvAtJXSHimaAEVS/qC/lAOKZrqrFJmBi5X7v9yuvyLtgVv1V1DvR27TX6H2wD3+L/ziayb6s69KA78j3v83fG2cBmX4a9c+KjeAAeJ17yu4bwGfgyb3q7a7dxTOh8j6nfOi/gDp6D+D53TPPQAAAABJRU5ErkJggg=="}
                        ID={users.id}
                        onDelete={this.props.onDelete}
                        writeMsg={this.props.writeMsg}
                    />;
    });
    const desMsg = this.state.messages.map((msg,i) => {
        return <MsgCom 
                    key={i}     
                    msg ={msg}
        />;
    });
    return (
        <div>
            <NavComponent/>
            <div className="row bgnb">
                <div className="col-md-3 p-0 ">
                    <div className="container">
                        <div>
                            <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                                <ul className="list-group pull-down" id="contact-list">
                                    {SnipItInHTML}
                                </ul>
                            </div>
                        </div>
                        <Modal show={this.state.showModal} onClose={() => this.setState({showModal: false})} />
                    </div>
                </div>
                <div className="col-md-6 d-inline-block">
                    <div className="container">
                        <AddWidgetCom addVideoToParent={this.addVideoToParent.bind(this)} removeItemFromParent={this.removeItemFromParent.bind(this)}
                            saveWidget={this.saveWidget.bind(this)}
                        />
                        <MediaSelectorComp/>
                        <CardComponent 
                            className="mt-3 mx-auto"
                            codeName="sometom"
                            imgUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP0AAADHCAMAAADlCqUFAAAAFVBMVEXMzMzb29vOzs7Z2dnW1tbR0dHU1NT2HhYqAAAD60lEQVR4nO2dybLrIAxEPf//J9+AU5XEL5Vng9pwQGeTbdqSWgI8DIPjOI7jOI7jOI7jOE4iU2Rd1/hb+t/cx0Pysszz+M68bGv7l2Dalk/ZH5dga/kCTD+UP1nW0n9SwwnpewI0qH9dTknf41/6zxozXdAewt9S+V/U3pb89ar2saHkvxz4SBu9bzpn9F/jj78CU7L2CHv8yRQfMwCr30D8g620jDRsxFP7X5rbfwM4/G5m4oHyrfKeKT+90TcgP2W+/QXK+mzzPkAa/S0t7wkn9+1D/8j90qJOY131EUzwjQ1/hxJ8ReKPmOALPC8AsX1J4j8oresUosSHpL7E8QOI1Ldb2h5AuL6q7McRMOzLyh5R+LKyR+zxibp9AGB7MtPrXT1gj6Nv9bqGB2h5wobn6ivH1bt6V+/qXb2rd/Xtqx+E4uvf2sq4Re+/AFa4fav33Q0Rfe/r9b2nW3/D61y9btypv90r1QMsX9jwAZYvbHkAyxe2PIDp6UyfYHo620OYnmyNizA9me0hyl5le4AjzIjG9iBlL7I9SNmLpj1I4mtsj9HtA4rCp5S9pvAxiS+JPWKJE9B0PIh81ZzPyH3V+h7he7qdLULwdfv5hGlPd5ZDSH3dKSZglae8e8HV143y7oX61Qtdj7DM69vz++73uhNswjqn70lXVvgE09MVPqHse1/fi1Kf0O8CmuATHD+iCD4l9INilcsw/B3zpQ5gaf/G9Rco/wT3ctHJbuJFfljAKvtJJf/CKvlBbv+G1cTLmHCPWA09mDHnAyv1RM8brAqfaXpWhc8se6vUhya+TcenJr7NBic18W1SH5v4Fq7PTXyL1GeOOk9yfY+1rj+SG3yu50Uyg1/672eSF3x46DNtH131gZyejzb8nfS1DnNT50Cy8eHzPpCa+w3kfSDN95vI+0DX30dMkY/v9G9cL/1Gij7i6l29q3f1fam//joGV98Mrt7Vd6m+b8939a7e1Z+j7/V9S+qv7+00tLHl6jtWf/08pyX1CUeZTRzkRFJOc9pp+Emn2K0EP+0kq5WOn3iI20bwk+/eaEF++q0r7NvVIjn37dDl5z6Xh5bf9Z2qFg9n4B7DfLIaPY5IDL/hk7gzTb/1U8gk/cbaA5j4r5r3bsyAR7EnK6/7pn+rW78g5T+p1wCUYX9RZwFMwm+jHagtAe4J+4uaHEBe7d+oYwK+O+wvyjvAtJXSHimaAEVS/qC/lAOKZrqrFJmBi5X7v9yuvyLtgVv1V1DvR27TX6H2wD3+L/ziayb6s69KA78j3v83fG2cBmX4a9c+KjeAAeJ17yu4bwGfgyb3q7a7dxTOh8j6nfOi/gDp6D+D53TPPQAAAABJRU5ErkJggg=="
                            con1="34" 
                            con2="Race car Driver" 
                            con3="love Jello"
                        />
                        <Masonry
                            className={'my-gallery-class'} // default ''
                            elementType={'ul'} // default 'div'
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        >
                            {widgetsInHTML}
                        </Masonry>
                    </div>
                </div>
                <div className="col-md-3 p-0 ">
                    <div className="container bg-light">
                        <ul id="messages">
                            {desMsg}
                        </ul>
                        
                        <input id="m" autoComplete="off" onChange={(e) => this.setState({message: e.target.value})} value={this.state.password}/>
                        <button onClick={()=>this.message()} >Send</button>
                        
                    </div>
                </div>
            </div>
        </div>
                 
                 
    );
  }
}