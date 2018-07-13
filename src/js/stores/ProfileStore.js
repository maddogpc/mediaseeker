import Flux from 'react-flux-dash';
class SessionStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            authenticated: false ,
            username: ""
        };
    }
    
    //you are forced to use _ to avoid using the setters anywhere else
    _setAuthentication(data){
        //set the the new store state and emit
        this.setStoreState({ authenticated: data.authenticated }).emit();
        //you can specify an event name if you want
        this.setStoreState({ authenticated: data.authenticated, username: data.username }).emit('EVENT_NAME');
        console.log("store got it: " + this.state.authenticated);
        console.log("user: " + this.state.username);
    }
    
    getAutentication(){
        return this.state.authenticated;
    }
}
export default new SessionStore();