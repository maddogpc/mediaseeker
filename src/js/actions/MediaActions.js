import Flux from '@4geeksacademy/react-flux-dash';
class MediaActions extends Flux.Action {
    postWidgetAction(username, password) {
          // Don't forget to Validate the data ex: username !=== undefined
          let dataToSave = {
              authenticated: true
          };
          console.log("got action");
          //Flux.dispatchEvent('postWidgetAction', dataToSave);
    }
    postBook(widgetTitle, mediaTitle, author, picture1, picture2) {
        var url = 'https://mediamatchdjangoserv-madechai.c9users.io/media/postwidget';
        var data = {type: 'book', widget_title: widgetTitle, media_title: mediaTitle, author: author, text: {picture1, picture2}};
        
        fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => Flux.dispatchEvent('postBookAction', response));
          
    }
    
    getWidgets(user) {
        fetch('https://mediamatchdjangoserv-madechai.c9users.io/widgets/'+user)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(myJson) {
                        myJson => Flux.dispatchEvent('getWidgets', myJson);
                    });
    }
    
}
export default new MediaActions();