import Flux from '@4geeksacademy/react-flux-dash';
class MediaActions extends Flux.Action {
    handleErrors(response) {
        if (!response.ok) {
            if (response.statusText == "Bad Request") {
                alert("The author provided could not be found, make sure it is typed correctly");
            }
            throw Error(response.statusText);
        }
        return response;
    }
    
    postBookAction(userName, mediaTitle, widgetTitle, mediaAuthor, picture1, picture2) {
        var url = 'https://mediamatchserver-madechai.c9users.io/addwidget/';
        var data = {type: 'book', user_name: userName, media_title: mediaTitle, widget_title: widgetTitle, media_author: mediaAuthor, text: {picture1, picture2}};
        
        fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(this.handleErrors)
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('postBook', response));
    }
    
    postYoutubeAction(userName, widgetTitle, listOfVideos) {
        var url = 'https://mediamatchserver-madechai.c9users.io/addwidget/';
        var data = {type: 'youtube', user_name: userName, widget_title: widgetTitle, text: listOfVideos};
        
        fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('postYoutube', response));
    }
    
    postTextBoxAction(userName, widgetTitle, link, textArea) {
        var url = 'https://mediamatchserver-madechai.c9users.io/addwidget/';
        var data = {type: 'textarea', user_name: userName, widget_title: widgetTitle, text_link: link, text: textArea};
        
        fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('postYoutube', response));
    }
    
    getWidgets(user) {
        let url = 'https://mediamatchserver-madechai.c9users.io/getwidgets/'+user;
        fetch(url, {
            method: 'GET', // or 'PUT'
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('getWidgets', response));
    }
    
}
export default new MediaActions();