import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
export default class FlipCover extends React.Component {
    constructor() {
        super();
        this.state = {
            imageSrc1: "",
            imageSrc2: "",
            width: 0,
            height: 0
        };
    }
    componentDidMount() {
        let images = this.props.images;
        let src1 = images.picture1;
        let src2 = images.picture2;
        var sizes = this.props.sizes.split(" ");
        let width1= parseInt(sizes[0]);
        let height1 = parseInt(sizes[1]);
        let width2 = parseInt(sizes[2]);
        let height2 = parseInt(sizes[3]);
        let sumSize1 = width1 + height1;
        let sumSize2 = width2 + height2;
        let width, height;
        if (sumSize1<sumSize2) {
            if (width1>320) {
                let ratio = height1/width1;
                width = 320;
                height = ratio * 320;
            }
            else {
                width = sizes[0];
                height = sizes[1];
            }
        }
        else {
            if (width2>320) {
                let ratio = height2/width2;
                width = 320;
                height = ratio * 320;
            }
            else {
                width = sizes[2];
                height = sizes[3];
            }
        }
        this.setState({imageSrc1:src1, imageSrc2:src2, width, height});
    }
    flip() {
        let id = "#" + this.props.id;
        document.querySelector(id).classList.toggle('flipper-active');
    }
    
    render() {
        const flipContainerStyles = {
            perspective: "1000px",
            width: "320px",
            height: this.state.height+"px"
        };
        const flipper = {
            transition: "0.6s",
            transformStyle: "preserve-3d",
            position: "relative"
        };
        const imgSize = {
            width: this.state.width+"px",
            height: this.state.height+"px"
        };
        const likeBtn = {
            position: "absolute",
            zIndex: 1,
            top: "5px",
            left: "5px",
            color: "blue",
            backgroundColor: "white",
            fontSize: "20px"
        };
        return (
            <div className="flip-container" style={flipContainerStyles} onClick={() => this.flip()}>
                <div id={this.props.id} className="flipper" style={flipper}>
                    <div className="front">
                        {/* front content */}
                        <img ref={(el) => this.imgRef1 = el} style={imgSize} src={this.state.imageSrc1} />
                    </div>
                    <div className="back">
                        {/* back content */}
                        <img ref={(el) => this.imgRef2 = el} style={imgSize} src={this.state.imageSrc2} />
                    </div>
                </div>
            </div>
        );
    }
}
FlipCover.propTypes = {
    images: PropTypes.object,
    sizes: PropTypes.string,
    id: PropTypes.string
};