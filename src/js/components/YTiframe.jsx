import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class YTiframe extends React.Component {
    
    constructor() {
        super();
        this.state = {
            play: true,
            target: ""
        };
    }
    
    returnYTplayer() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
            }
        };
        
        let elem = <YouTube
                videoId={this.props.id}
                opts={opts}
                onReady={(event) => this.onReadyHandler(event)}
        />;
        ReactDOM.render(elem, document.querySelector("#iframe-container"+this.props.ID));
        
    }
    
    playPause() {
        if (this.state.play) {
            this.state.target.pauseVideo();
            this.setState({play: false});
        }
        else {
            this.state.target.playVideo();
            this.setState({play: true});
        }
    }
    
    onReadyHandler(event) {
        this.setState({target: event.target});
        let queryButton = "#playPause" + this.props.ID;
        let playPauseButton = document.querySelector(queryButton);
        playPauseButton.onclick = () => this.playPause();//target.pauseVideo();
        
    }

    componentDidMount() {
        this.returnYTplayer();
    }
    
    componentDidUpdate() {
        this.returnYTplayer();
    }
    
    render () {
        return (
            <div className="iframe-container" id={"iframe-container"+this.props.ID}></div>
            );
    }
        
    
}
YTiframe.propTypes = {
    id: PropTypes.string,
    ID: PropTypes.string
};
 