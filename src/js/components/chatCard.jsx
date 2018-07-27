import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


class SnipIt extends React.Component{

    
    render(){
        return (
            
            <li className="list-group-item textp">
                <div className="row w-100">
                    <div className="col-12 col-sm-6 col-md-3 px-0">
                        <img src={this.props.imgUrl ? this.props.imgUrl : 'https://i.stack.imgur.com/l60Hf.png' } alt={this.props.name} className="rounded-circle mx-auto d-block img-fluid" />
                    </div>
                    <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                        <div className=" float-right">
                            <button className="btn" onClick={() => this.props.writeMsg(this.props.name)}><i className="fas fa-pencil-alt mr-3"></i></button>
                            <button className="btn" onClick={() => this.props.onDelete(this.props.ID)}><i className="fas fa-trash-alt"></i></button>
                        </div>
                        <label className="name lead textp">{this.props.name}</label>
                        <span className="fa fa-envelope fa-fw text-muted mr-3 textp" data-toggle="tooltip" data-original-title="" title=""></span>
                        <span className="text-muted small text-truncate textp">{this.props.email}</span>
                    </div>
                </div>
            </li>
        );
    }
    
}

/**
 * here is where you define the data-types for
 * your component propersties
**/
SnipIt.propTypes = {
    history: PropTypes.object,
    onDelete: PropTypes.func,
    writeMsg: PropTypes.func,
    name: PropTypes.string,
    phone:PropTypes.string,
    email:PropTypes.string,
    gender: PropTypes.string,
    imgUrl: PropTypes.string,
    ssn:PropTypes.string,
    ID: PropTypes.number
    
};

/**
 * here is where you define the default values
 * for your component propersties
**/
SnipIt.defaultProps = {
  onDelete: null
};
export default SnipIt;