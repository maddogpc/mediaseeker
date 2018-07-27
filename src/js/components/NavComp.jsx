import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class NavComponent extends React.Component{
    render(){
        const padding = {
            backgroundColor: "#ff8584"
        };   
        return (
            <div className="container-fluid" style={padding}>
                <nav className="navbar navbar-expand-lg bgg textp">
                    <Link to="/feed" className="navbar-brand textp">media seeker</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/profile" className="nav-link textp">Profile<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/addwidget" className="nav-link textp">Add Widget<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/friend" className="nav-link textp">Friend Selector</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline my-2 my-sm-0 " type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}
// ButtonComponent.propTypes = {
//   className: PropTypes.string,
//   label: PropTypes.string.isRequired,
//   to: PropTypes.string.isRequired,
//   color: PropTypes.string
// };
// ButtonComponent.defaultProps = {
//   className: '',
//   color: 'light'
// };
export default NavComponent;