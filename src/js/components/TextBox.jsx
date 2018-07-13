import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleUp} from '@fortawesome/free-solid-svg-icons';
export default class TextBox extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            link: "",
            text: "",
            collapsed: true,
            collapsedText: ""
        };
    }
    componentDidMount() {
        let textDotDotDot = this.props.textObj.text.substr(0,275) + "...";
        let title = this.props.textObj.title;
        let link = this.props.textObj.link;
        let text = textDotDotDot;
        this.setState({title, link, text, collapsedText:text});
    }
    collapse() {
        if (this.state.collapsed) {
            this.setState({text: this.props.textObj.text, collapsed: false});
        }
        else if (!this.state.collapsed) {
            let collapsedText = this.state.collapsedText;
            this.setState({text: collapsedText, collapsed: true});
        }
        this.props.toggle();
    }
    render() {
        const cardAbbreviatedStyles = {
            position: "relative",
            overflow: "hidden",
            width: "20.7rem"
        };
        
        const buttonStyles = {
            position: "absolute",
            width:"20.5rem",
            height:"3.8rem",
            bottom: 0,
            left: 0
        };
        
        return (
            <div id="card" className="card" style={cardAbbreviatedStyles}>
                <div className="card-body">
                    <h5 className="card-title">{this.state.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.state.link}</h6>
                    <p className="card-text">{this.state.text}<br/><br/></p>
                    <button onClick={() => this.collapse()} style={buttonStyles}>
                        {this.state.collapsed ? (
                            <FontAwesomeIcon icon={faAngleDoubleDown}/>
                        ) : <FontAwesomeIcon icon={faAngleDoubleUp}/>}
                    </button>
                </div>
            </div>
            );
    }
}
TextBox.propTypes = {
    textObj: PropTypes.object,
    toggle: PropTypes.func
};