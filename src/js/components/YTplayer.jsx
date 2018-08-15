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
    position: "relative",
    padding: "5px",
    width: "330px"
};
const liStyle = {
    width: "320px",
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
const imgleft = {
    float: "left"
};
const btnlayout = {
    position: "relative",
    width: "320px"
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
            videoIds: [],
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
        let videoIds = [];
        let videos = this.props.videos;
        let strlen;
        let videoId;
        for(let x=0; x<videos.length; x++) {
            strlen = videos[x].url.length;
            videoId = videos[x].url.substr(strlen-11, 11);
            videoIds.push(videoId);
        }
        this.setState({videoIds});
    }
    
    addLIs() {
        var lis = [];
        let videos = this.props.videos;
        let strlen;
        let videoId;
        for(let x=0; x<videos.length; x++) {
            strlen = videos[x].url.length;
            videoId = videos[x].url.substr(strlen-11, 11);
            lis.push(<li key={x} id={videoId} className="list-group-item" onMouseOver= {(e) => e.target.style.cursor = "pointer"} onClick={this.openVideo} style={liStyle}>
                <img className="playbtn" src={youtubeIMG} style={playbtnStyle}/>
                &nbsp;&nbsp;{videos[x].artist}-{videos[x].name}</li>);
        }
        return lis;
    }
    
    previousNext(next) {
        let videoId = this.state.videoId;
        let videoIds = this.state.videoIds;
        let index;
        let newId;
        if (videoId !== "") {
            for (let i=0; i<videoIds.length; i++) {
                if (videoIds[i] == videoId) {
                    index = i;
                }
            }
            if ((index == 0) && (!next)) {
                newId = videoIds[videoIds.length-1];
            }
            else if ((index == videoIds.length-1) && (next)) {
                newId = videoIds[0];
            }
            else {
                if (!next) {
                    newId = videoIds[index-1];
                } 
                else {
                    newId = videoIds[index+1];
                }
            }
            this.setState({videoId: newId});
            this.imgRef.src = "http://img.youtube.com/vi/" + newId + "/default.jpg";
            this.props.parentUpdate(this.props.ID);
        }
    }
    
    render() {
        const closeIcon = {
            position: "absolute",
            top: 0,
            left: 0,
            color: "red",
            backgroundColor: "white",
            fontSize: "16px"
        };
        return (
            <div>
                <div className="YTplayer" style={YTplayerStyles}>
                    <ul className="list-group list-group-flush" id="UL" style={liStyle}>
                        <li className="list-group-item" style={nopadding}>
                            <div>
                                <div style={imgleft}><img ref={(el) => this.imgRef = el} src={youtubeIMG} height="70rem" /></div>
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
                </div>    
                <div className="iframe-container" style={iframeContainerStyles}>
                    {this.state.videoTriggered ? (
                        <FontAwesomeIcon onMouseOver= {(e) => e.target.style.cursor = "pointer"} onClick={()=>this.unrenderVideo()} icon={faWindowClose} style={closeIcon}/>  
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
    title: PropTypes.string,
    videos: PropTypes.array,
    ID: PropTypes.string
};
 