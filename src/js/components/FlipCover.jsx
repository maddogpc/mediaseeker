import React from 'react';
import PropTypes from 'prop-types';
export default class FlipCover extends React.Component {
    constructor() {
        super();
        this.state = {
            imageSrc1: "",
            imageSrc2: "",
            imageWidth1: "",
            imageHeight1: ""
        };
    }
    componentDidMount() {
        let images = this.props.images;
        let srcWidthHeight1 = images["image1"].split(" - ");
        let srcWidthHeight2 = images["image2"].split(" - ");
        
        let src1 = srcWidthHeight1[0];
        let src2 = srcWidthHeight2[0];
        
        let widthHeight1 = srcWidthHeight1[1].split("x");
        let width1 = widthHeight1[0];
        let height1 = widthHeight1[1];
        
        this.setState({imageSrc1:src1, imageSrc2:src2, imageWidth1:width1, imageHeight1:height1});
    }
    flip() {
        let id = "#" + this.props.id;
        document.querySelector(id).classList.toggle('flipper-active');
        this.imgRef2.width = this.imgRef1.width;
        this.imgRef2.height = this.imgRef1.height;
    }
    
    render() {
        const flipContainerStyles = {
            perspective: "1000px",
            width: "320px",
            height: "520px"
        };
        const flipper = {
            transition: "0.6s",
            transformStyle: "preserve-3d",
            position: "relative"
        };
        return (
            <div  className="flip-container" style={flipContainerStyles} onClick={() => this.flip()}>
                <div id={this.props.id} className="flipper" style={flipper}>
                    <div className="front">
                        {/* front content */}
                        <img ref={(el) => this.imgRef1 = el} src={this.state.imageSrc1}/>
                    </div>
                    <div className="back">
                        {/* back content */}
                        <img ref={(el) => this.imgRef2 = el} src={this.state.imageSrc2}/>
                    </div>
                </div>
            </div>
        );
    }
}
FlipCover.propTypes = {
    images: PropTypes.object,
    id: PropTypes.string
};