/* global fetch */
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
        }).then(res => {
            return res.json();
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .then(response => Flux.dispatchEvent('login', response));
    }
    
    search(username) {
        var url = 'https://mediamatchserver-madechai.c9users.io/getprofile/'+username;
        fetch(url, {
            method: 'GET', // or 'PUT'
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => {
            return res.json();
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .then(response => Flux.dispatchEvent('search', response));
    }
    
    logoutAction(username) {
        var url = 'https://mediamatchserver-madechai.c9users.io/logout/';
        let checkEmail = EmailValidator.validate(username); 
        let data = {user: username};
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => {
            return res.json();
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .then(response => Flux.dispatchEvent('onLogout', response));
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
    
    getFriendsAction(usernamejs) {
        var url = 'https://mediamatchserver-madechai.c9users.io/getfriends/'+usernamejs;
        fetch(url, {
            method: 'GET', 
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('getFriends', response));
    }
    
    findRecommendedFriends(username) {
        console.log(username);
        var url = 'https://mediamatchserver-madechai.c9users.io/findrecommendedfriends/'+username;
        fetch(url, {
            method: 'POST', 
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('findRecommendedFriends', response));
    }
}
export default new SessionActions();