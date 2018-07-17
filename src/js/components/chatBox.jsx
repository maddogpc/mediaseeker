import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


class DM extends React.Component{

    
    render(){
        var msg =( () =>{});
        
        
        return (
            
            <div className="row w-100">
                
            </div>
            
        );
    }
    
}

/**
 * here is where you define the data-types for
 * your component propersties
**/
DM.propTypes = {
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
DM.defaultProps = {
  onDelete: null
};
export default DM;