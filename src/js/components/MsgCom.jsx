import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


class MsgCom extends React.Component{

    
    render(){
        return (
            
            <li className="list-group-item textp speech-bubble mt-3">
                <div className="row w-100">
                    
                    <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                        <label className="name lead textp">{this.props.msg}</label>
                        
                        
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
MsgCom.propTypes = {
    history: PropTypes.object,
    msg: PropTypes.string,
    
    
};

/**
 * here is where you define the default values
 * for your component propersties
**/
MsgCom.defaultProps = {
  onDelete: null
};
export default MsgCom;