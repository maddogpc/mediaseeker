import Flux from '@4geeksacademy/react-flux-dash';
import * as EmailValidator from 'email-validator';

class SessionActions extends Flux.Action {
    loginAction(username, user_password) {
        var url = 'https://mediamatchserver-madechai.c9users.io/login/';
        let checkEmail = EmailValidator.validate(username); 
        var data;
        if (checkEmail) {
            data = {user: username, password: user_password, email: true};
        }
        else {
            data = {user: username, password: user_password, email: false};
        }
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('login', response));
    }
    
    createProfileAction(usernamejs, emailjs, passwordjs, birthdatejs, genderjs, cityjs, statejs, zipjs) {
        var data = {username: usernamejs, email: emailjs, password: passwordjs, birth_date: birthdatejs, gender: genderjs, city: cityjs, state: statejs, zip_code: zipjs};
        var url = 'https://mediamatchserver-madechai.c9users.io/createprofile/';
        fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('createProfile', response));
    }
}
export default new SessionActions();