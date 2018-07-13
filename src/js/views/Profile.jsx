import React from "react";
import Masonry from 'react-masonry-component';
import Flux from "@4geeksacademy/react-flux-dash";
import YTplayer from "../components/YTplayer.jsx";
import FlipCover from "../components/FlipCover.jsx";
import TextBox from "../components/TextBox.jsx";
import MediaStore from '../stores/MediaStore.js';
import MediaActions from '../actions/MediaActions.js';
export default class Profile extends Flux.View {
    constructor() {
        super();
        this.state = {
            currentPlayer: "",
            toggle: false
        };
    }
    componentDidMount() {
        this.mediaSubscription = MediaStore.subscribe("getWidgets", (data) => {
            // Do something usefull with the Event Data
            //me.userName = state.user.name;
            console.log(data);
        });
    }
    parentUpdate(playerID) {
        this.setState({currentPlayer: playerID ? playerID : ""});
    }
    toggle() {
        this.setState({toggle: !this.state.toggle});
    }
  render() {
    /*
    var text = '{ "widgetList" : [' +
    '{ "type": "videoList", "videos": { "Madeon - Icarus": "XHs99iVpnXU", "Porter Robinson & Madeon - Shelter": "HQnC1UHBvWA", "Madeon - Technicolor": "Vois0RMtPHE" } },' +
    '{ "type": "videoList", "videos": { "Madeon - Icarus": "XHs99iVpnXU", "Porter Robinson & Madeon - Shelter": "HQnC1UHBvWA", "Madeon - Technicolor": "Vois0RMtPHE" } },' +
    '{ "type": "FlipCover", "images": { "image1": "https://images-na.ssl-images-amazon.com/images/I/410RwZ-Yw1L._SX331_BO1,204,203,200_.jpg - 320x520", "image2": "https://res.cloudinary.com/bookbub/image/upload/c_scale,w_405/v1497568616/pro_pbid_1022449.jpg - 320x520" } },' +
    '{ "type": "videoList", "videos": { "Madeon - Icarus": "XHs99iVpnXU", "Porter Robinson & Madeon - Shelter": "HQnC1UHBvWA", "Madeon - Technicolor": "Vois0RMtPHE" } },' +
    '{ "type": "FlipCover", "images": { "image1": "https://images-na.ssl-images-amazon.com/images/I/410RwZ-Yw1L._SX331_BO1,204,203,200_.jpg - 320x520", "image2": "https://res.cloudinary.com/bookbub/image/upload/c_scale,w_405/v1497568616/pro_pbid_1022449.jpg - 800x520" } },' +
    '{ "type": "FlipCover", "images": { "image1": "https://images-na.ssl-images-amazon.com/images/I/410RwZ-Yw1L._SX331_BO1,204,203,200_.jpg - 320x520", "image2": "https://res.cloudinary.com/bookbub/image/upload/c_scale,w_405/v1497568616/pro_pbid_1022449.jpg - 320x520" } },' +
    '{ "type": "FlipCover", "images": { "image1": "https://images-na.ssl-images-amazon.com/images/I/410RwZ-Yw1L._SX331_BO1,204,203,200_.jpg - 700x200", "image2": "https://res.cloudinary.com/bookbub/image/upload/c_scale,w_405/v1497568616/pro_pbid_1022449.jpg - 400x500" } },' +
    '{ "type": "TextBox", "textObj": {"title":"John", "link":"Doe", "text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32."} },' +
    '{ "type": "TextBox", "textObj": {"title":"John", "link":"Doe", "text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32."} },' +
    '{ "type": "TextBox", "textObj": {"title":"John", "link":"Doe", "text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32."} },' +
    '{ "type": "TextBox", "textObj": {"title":"John", "link":"Doe", "text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32."} },' +
    '{ "type": "FlipCover", "images": { "image1": "https://images-na.ssl-images-amazon.com/images/I/410RwZ-Yw1L._SX331_BO1,204,203,200_.jpg - 150x400", "image2": "https://res.cloudinary.com/bookbub/image/upload/c_scale,w_405/v1497568616/pro_pbid_1022449.jpg - 700x200"} } ]}';

    var parsed = JSON.parse(text);
    var widgets = parsed.widgetList;
    const widgetsInHTML = widgets.map((widget,i) => {
        if (widget.type === "videoList") {
            return <YTplayer currentPlayer={this.state.currentPlayer} parentUpdate={(id) => this.parentUpdate(id)} ID={"uniqueID"+i} videos={widget.videos} key={i}/>;
        }
        else if (widget.type === "FlipCover") {
            return <FlipCover id={"flipper"+i} images={widget.images} key={i}/>;
        }
        else if (widget.type === "TextBox") {
            return <TextBox toggle={() => this.toggle()} textObj={widget.textObj} key={i}/>;
        }
    });
    */
    
    return (
        <div className="row">
            <div className="col-lg-3">
                <button type="button" className="btn btn-primary mb-2">Test</button>
                
                <h2>Biography</h2><br/>
                
                <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet ante ac lacus laoreet dictum eget nec nibh. Aliquam erat volutpat. Ut vestibulum, mi consectetur ullamcorper lobortis, risus metus iaculis turpis, at maximus diam leo in tortor. Aliquam consequat nunc sit amet augue dignissim volutpat. Ut eu metus quis mauris porta malesuada sit amet viverra justo. Maecenas vitae blandit tellus. Proin tincidunt facilisis felis, eu rhoncus mi. Maecenas vehicula lobortis lectus, vel tincidunt erat convallis nec. Praesent eu odio massa. Aenean et mattis ante. Cras nec purus ipsum. Nullam pharetra ex eget mauris viverra, eget pellentesque odio rhoncus. Morbi quis risus metus. Morbi a molestie odio, vel bibendum ante. Vivamus placerat tellus sit amet egestas feugiat. Maecenas interdum risus vel purus convallis, eu blandit justo ultrices.

Donec eu augue a nibh aliquet tristique at id ante. Vivamus sit amet ex non mi ullamcorper pharetra. Quisque tincidunt vestibulum eleifend. Mauris eu semper urna. Vivamus consequat, mauris ut euismod aliquet, odio dui suscipit eros, eget cursus nunc justo sed sapien. Vestibulum blandit cursus lectus, a posuere nisl ultrices sit amet. Curabitur et sapien diam.

Integer sit amet metus tincidunt, egestas metus gravida, egestas justo. Fusce a vehicula enim, non suscipit urna. Suspendisse ligula est, suscipit id ligula condimentum, ultricies aliquet diam. Ut eget pulvinar metus. Vivamus et varius mauris. Donec pulvinar malesuada lectus, ut euismod dui sodales vitae. Mauris sit amet tincidunt est. Sed venenatis euismod justo. Nunc accumsan fermentum lorem, sodales interdum dolor condimentum nec. Pellentesque magna ligula, placerat vitae sem quis, ultrices consectetur quam. Fusce dapibus orci at vulputate sollicitudin.
                </p>
            </div>
            <div className="col-lg-9">
                <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                //options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                //imagesLoadedOptions={imagesLoadedOptions} // default {}
                >
                    {/* {widgetsInHTML} */}
                </Masonry>
            </div>
            
        </div>
    );
  }
}
