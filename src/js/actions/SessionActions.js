import Flux from '@4geeksacademy/react-flux-dash';
class SessionActions extends Flux.Action {
    login(user) {
        var url = 'https://mediamatchdjangoserv-madechai.c9users.io/profiles/login/'+user;
        //var data = {user: this.inputRef.value};
        fetch(url, {
            method: 'GET', // or 'PUT'
            //body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('login', response));
    }
}
export default new SessionActions();