import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class CardComponent extends React.Component{
    
    render(){
        var undef =0;
        if(typeof this.props.codeName == "undefined"){
            undef= "missing name";
        }else{
            undef=this.props.codeName;
        }
        return (
            <div className={"card " + this.props.className} >
                {(this.props.imgUrl) ? <img className="card-img-top" src={this.props.imgUrl } alt="Card image cap"/> : ""}
                <div className="card-body">
                    <h5 className="card-title">{(this.props.codeName) ? this.props.codeName : "no Name"}</h5>
                    <p><i className="fas fa-gamepad"></i></p>
                    <ul>
                        <li>{(this.props.con1) ? this.props.con1 : "no info"}</li>
                        <li>{(this.props.con2) ? this.props.con2 : "no info"}</li>
                        <li>{(this.props.con3) ? this.props.con3 : "no info"}</li>
                    </ul>
                    <a href="#" className="btn btn-success">Yes</a>
                    <a href="#" className="btn btn-danger">No</a>
                </div>
            </div>
        );
    }
}
CardComponent.propTypes = {
    history: PropTypes.object,
    onDelete: PropTypes.func,
    className: PropTypes.string,
    codeName: PropTypes.string,
    imgUrl: PropTypes.string,
    con1: PropTypes.string,
    con2: PropTypes.string,
    con3: PropTypes.string
   
    
};
export default CardComponent;