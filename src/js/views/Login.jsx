import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import SessionActions from '../actions/SessionActions.js';
import SessionStore from '../stores/SessionStore.js';
import MediaActions from '../actions/MediaActions.js';
import MediaStore from '../stores/MediaStore.js';
export default class Login extends Flux.View {
    constructor(){
        super();
        //this.login = this.login.bind(this);
        //this.getWidgets = this.getWidgets.bind(this);
        this.state = {
            user: "",
            auth: false
        };
    }  
    
    componentDidMount() {
        this.loginSubscription = SessionStore.subscribe("login", (auth) => {
            this.setState({user: auth.user, auth: auth.auth});
            if (auth.auth) {
                console.log(auth.user);
                MediaActions.getWidgets(auth.user);
            }
        });
        // this.mediaSubscription = MediaStore.subscribe("getWidgets", (media) => {
        //     console.log(media);
        //     //this.props.history.push('/profile');
        // });
    }
   
    render() {
        return (
            <div>
                <input type="text" name="user" ref={(el) => this.inputRef = el} />
                <button type="button" className="btn btn-primary mb-2" onClick={() => SessionActions.login(this.inputRef.value)}>Clickme</button>
            </div>
        );
    }
}
