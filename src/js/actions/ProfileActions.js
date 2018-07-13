import Flux from 'react-flux-dash';
import SessionStore from '../stores/SessionStore.js';
class SessionActions extends Flux.Action{
    
    authenticateUser(username){
        console.log("got action");
        this.dispatch('SessionStore.setAuthentication', {authenticated: true, username: username});
        // you will have to create a _setAutentication inside StoreActions
    }
}
export default new SessionActions();