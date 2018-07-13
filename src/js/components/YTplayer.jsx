//import "../../styles/inde.scss"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faStepForward, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import youtubeIMG from '../../img/youtubePlay.png';
import React from 'react';
import PropTypes from 'prop-types';
import YTiframe from "../components/YTiframe.jsx";
const iframeContainerStyles = {
    position: "fixed",
    bottom: 0, 
    right: 0,
    zIndex: 2
};
const YTplayerStyles = {
    position: "absolute",
    padding: "5px"
};
const liStyle = {
    border: "2px",
    borderColor: "pink",
    borderStyle: "inset"
};
const nopadding = {
    border: "2px",
    borderColor: "#74e8dd",
    borderStyle: "dashed",
    padding: 0
};
const inline = {
    display: "inline"
};
const title = {
    fontStyle: "italic",
    fontSize: "20px",
    textAlign: "center"
};
const imgleft = {
    float: "left"
};
const btnlayout = {
    position: "relative"
};
const buttons = {
    width: "4rem",
    height: "4rem",
    top: ".2rem",
    position: "relative"
};
const playbtnStyle = {
    height: "15px",
    width: "15px"
};
export default class YTplayer extends React.Component {
    constructor() {
        super();
        this.state = {
            videoList: [],
            videoTriggered: false,
            videoId: "",
            play: true
        };
        this.openVideo = this.openVideo.bind(this);
    }
    
    openVideo(e) {
        if (!this.state.videoTriggered) {
            this.setState({videoTriggered: !this.state.videoTriggered});
        }
        let newId = e.target.id;
        this.setState({videoId: newId});
        this.imgRef.src = "http://img.youtube.com/vi/" + newId + "/default.jpg";
        this.props.parentUpdate(this.props.ID);
    }
    
    unrenderVideo() {
        this.setState({videoTriggered: !this.state.videoTriggered});
    }
    
    componentDidMount() {
        let ids = [];
        let videos = this.props.videos;
        for(var key in videos) {
            var value = videos[key];
            ids.push(value);
        }
        this.setState({videoList: ids});
    }
    
    addLIs() {
        var lis = [];
        let keyProp = 0;
        let videos = this.props.videos;
        for(let key in videos) {
            let value = videos[key];
            lis.push(<li key={keyProp} className="list-group-item" id={value} onClick={this.openVideo} onMouseOver= {(e) => e.target.style.cursor = "pointer"} style={liStyle}>
                <img className="playbtn" src={youtubeIMG} style={playbtnStyle}/>
                &nbsp;&nbsp;{key}</li>);
            keyProp++;
        }
        return lis;
    }
    
    previousNext(bool) {
        let videoList = this.state.videoList;
        let currentVideoId = this.state.videoId;
        let videoIndex;
        if (currentVideoId != "") {
            for (let i=0; i<videoList.length; i++) {
                if (videoList[i] === currentVideoId) {
                    videoIndex = i;
                }
            }
        }
        let newId;
        if (bool) {
            if (videoIndex !== videoList.length-1) {
                newId=videoList[videoIndex+1];
                this.setState({videoId: newId});
                this.imgRef.src = "http://img.youtube.com/vi/" + newId + "/default.jpg";
            }
        }
        else if (!bool) {
            if (videoIndex !== 0) {
                newId=videoList[videoIndex-1];
                this.setState({videoId: newId});
                this.imgRef.src = "http://img.youtube.com/vi/" + newId + "/default.jpg";
            }
        }
    }
    
    render() {
        const closeIcon = {
            color: "red",
            backgroundColor: "white"
        };
        return (
            <div className="YTplayer" style={YTplayerStyles}>
                <ul className="list-group list-group-flush" id="UL">
                    <li className="list-group-item" style={title}>Title</li>
                    <li className="list-group-item" style={nopadding}>
                        <div>
                            <div style={imgleft}><img ref={(el) => this.imgRef = el} src={youtubeIMG} height="70rem" width="70rem"/></div>
                            <div style={inline}>
                                <div style={btnlayout}> 
                                    <FontAwesomeIcon onClick={()=>this.previousNext(false)} icon={faStepBackward} style={buttons}/>
                                    <span id={"playPause"+this.props.ID}>
                                        {this.state.play ? (
                                            <FontAwesomeIcon onClick={() => this.setState({play: false})} icon={faPauseCircle} style={buttons}/>
                                        ) : <FontAwesomeIcon onClick={() => this.setState({play: true})} icon={faPlayCircle} style={buttons}/>}
                                    </span>
                                    <FontAwesomeIcon onClick={()=>this.previousNext(true)} icon={faStepForward} style={buttons}/>  
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                {this.addLIs()}
                
                <div className="iframe-container" style={iframeContainerStyles}>
                    {this.state.videoTriggered ? (
                        <FontAwesomeIcon onClick={()=>this.unrenderVideo()} icon={faWindowClose} style={closeIcon}/>  
                    ) : ""}
                    {(this.props.currentPlayer===this.props.ID) && this.state.videoTriggered  ? (
                        <YTiframe ID={this.props.ID} id={this.state.videoId} />
                    ) : ''}
                </div>
            </div>
        );
    }
}
YTplayer.propTypes = {
    parentUpdate: PropTypes.func,
    currentPlayer: PropTypes.string,
    videos: PropTypes.object,
    ID: PropTypes.string
};
 