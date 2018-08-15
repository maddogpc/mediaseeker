import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import SessionActions from '../actions/SessionActions.js';
import SessionStore from '../stores/SessionStore.js';
import FriendActions from '../actions/FriendActions.js';
import FriendStore from '../stores/FriendStore.js';
class NavComponent extends React.Component{
    constructor() {
        super();
        this.state = {
            friendsPending: [],
            friendRequestModal: false,
            currentFriendRequest: ""
        };
        this.handleFriendRequest = this.handleFriendRequest.bind(this);
    }
    componentDidMount() {
        this.sessionSubscription = SessionStore.subscribe("search", (data) => {
            console.log(data);
            if (typeof data === "string") {
                alert(data);
            }
            else {
                this.props.redirect("/profile/"+data.user_name);
            }
        });
        
        this.friendSubscription = FriendStore.subscribe("getFriendsPending", (data) => {
            console.log(data);
            this.setState({friendsPending: data});
        });
        let username = localStorage.getItem('username');
        FriendActions.getFriendsPending(username);
    }
    
    componentWillUnMount() {
          this.sessionSubscription.unsubscribe();
    }
      
    triggerRequestModal(e) {
        this.setState({friendRequestModal: true, currentFriendRequest: e.target.id});
    }
    // () => this.setState({friendRequestModal: true})
    
    handleFriendRequest(add) {
        let username = localStorage.getItem('username');
        let friend = this.state.currentFriendRequest;
        if (add) {
            FriendActions.addFriend(username, friend);
        }
    }
    
      
    render(){
        const expanded = {
            paddingRight: 0,
            paddingLeft: 0
        };
        const friendRequests = Object.assign(this.state.friendsPending);
        var friendRequestsInHTML = friendRequests.map((friendRequest,i) => {
            return <a onClick = {(e) => this.triggerRequestModal(e)} key={i} id={friendRequest.friend_name} className="dropdown-item" href="#">{friendRequest.friend_name}</a>;
        });
        return (
            <div className="container-fluid expanded" style={expanded}>
                <nav className="navbar navbar-expand-lg bgg textp">
                    <Link to="/feed" className="navbar-brand textp link-aqua">MediaSeeker</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/profile" className="nav-link textp link-aqua">Profile</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/media" className="nav-link textp link-aqua">Recommended Media</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/recfriends" className="nav-link textp link-aqua">Recommended Friends</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/home" onClick = {() => SessionActions.findRecommendedFriends(localStorage.getItem('username'))} className="nav-link textp link-aqua">Logout</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <div className="dropdown"><button className="btn btn-outline my-2 my-sm-0 dropdown-toggle" type="button" 
                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Friend Requests ({this.state.friendsPending.length})</button><div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {friendRequestsInHTML}
                            </div>
                            </div>
                            &nbsp;&nbsp;
                            <div className="modal" id="messageModal" tabIndex="-1" role="dialog" style={{display: (this.state.friendRequestModal) ? 'inline-block' : 'none'}}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">What would you like to do with the friend request?</h5>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick = {() => this.setState({friendRequestModal: false})}>Cancel</button>
                                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick = {this.handleFriendRequest(false)}>Decline Friend Request</button>
                                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick = {this.handleFriendRequest(true)}>Add Friend</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input id="inputSearch" onChange={(e) => this.setState({search: e.target.value})} value={this.state.search} className="form-control mr-sm-2" type="search" placeholder="Search Profiles" aria-label="Search"/>
                            <button onClick={() => SessionActions.search(this.state.search)} className="btn btn-outline my-2 my-sm-0 " type="button">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}
NavComponent.propTypes = {
    redirect: PropTypes.func,
    loggedIn: PropTypes.bool
};
export default NavComponent;