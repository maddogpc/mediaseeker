import Flux from '@4geeksacademy/react-flux-dash';
import LoginStore from '../stores/LoginStore.js';




class LoginActions extends Flux.Action{
    
    addUser(inComeingUser){
        console.log("#2 step add a contact");
        //do whatever your like... and then...
        let user = LoginStore.getUser();
        user.push(inComeingUser);
        this.dispatch('MyStore.SetContacts', user);
    }
    
     
    
}   
export default new LoginActions();