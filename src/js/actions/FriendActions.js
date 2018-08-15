import Flux from '@4geeksacademy/react-flux-dash';
class FriendActions extends Flux.Action {
    handleErrors(response) {
        if (!response.ok) {
            if (response.statusText == "Bad Request") {
                alert("The author provided could not be found, make sure it is typed correctly");
            }
            throw Error(response.statusText);
        }
        return response;
    }
    postResponsYesAction(user,friend) {
        var url = 'https://mediamatchserver-madechai.c9users.io/addfriendspending/';
        var data = {  profile_name: user, friend_name: friend};
        
       
        fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('Add Friends Pending', response));
    }
    // postResponsNoAction(user,friend) {
    //     var url = 'https://mediamatchserver-madechai.c9users.io/deleteallfriendspending/';
    //     var data = {  profile_name: user, friend_name: friend};
        
       
    //     fetch(url, {
    //         method: 'PUT', // or 'PUT'
    //         body: JSON.stringify(data), // data can be `string` or {object}!
    //         headers:{
    //         'Content-Type': 'application/json'
    //     }
    //     }).then(res => res.json())
    //     .catch(error => console.error('Error:', error))
    //     .then(response => Flux.dispatchEvent('Delete Friends Pending', response));
    // }
    getFriendsPending(user) {
        let url = 'https://mediamatchserver-madechai.c9users.io/getfriendspending/'+user;
        fetch(url, {
            method: 'GET', // or 'PUT'
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('getFriendsPending', response));
    }
    
    addFriend(user1, user2) {
        let url = 'https://mediamatchserver-madechai.c9users.io/addfriend/';
        var data = {username1: user1, username2: user2};
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('addFriend', response));
    }
}
export default new FriendActions();