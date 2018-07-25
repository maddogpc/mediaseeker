import React from "react";
import Masonry from 'react-masonry-component';
import Flux from "@4geeksacademy/react-flux-dash";
import NavComponent from '../components/NavComp.jsx';
import YTplayer from "../components/YTplayer.jsx";
import FlipCover from "../components/FlipCover.jsx";
import TextBox from "../components/TextBox.jsx";
import MediaStore from '../stores/MediaStore.js';
import MediaActions from '../actions/MediaActions.js';
import SessionStore from '../stores/SessionStore.js';
export default class Profile extends Flux.View {
    constructor() {
        super();
        this.state = {
            user: "",
            widgetsInHTML: [],
            currentPlayer: "",
            toggle: false
        };
    }
    
    componentDidMount() {
        this.mediaSubscription = MediaStore.subscribe("getWidgets", (data) => {
            this.setState({widgets: data});
        });
        const storeState = SessionStore.getState();
        MediaActions.getWidgets(storeState.login.username);
    }
    
    parentUpdate(playerID) {
        this.setState({currentPlayer: playerID ? playerID : ""});
    }
    
    toggle() {
        this.setState({toggle: !this.state.toggle});
    }
    
  render() {
    if (this.state.widgets !== undefined && this.state.widgets.length !== 0) {
        const widgets = Object.assign(this.state.widgets);
        var widgetsInHTML = widgets.map((widget,i) => {
            if (widget.widget_type === "youtube") {
                let parsedVideos = JSON.parse(widget.content);
                return <YTplayer currentPlayer={this.state.currentPlayer} parentUpdate={(id) => this.parentUpdate(id)} ID={"uniqueID"+i} title={widget.title} videos={parsedVideos} key={i+100}/>;
            }
            else if (widget.widget_type === "book") {
                let parsedImages = JSON.parse(widget.content);
                return <FlipCover id={"flipper"+i} sizes={widget.image_size} images={parsedImages} key={i+200}/>;
            }
            else if (widget.widget_type === "textarea") {
                return <TextBox toggle={() => this.toggle()} title={widget.title} link={widget.link} text={widget.content} key={i+300}/>;
            }
        });
    }
    
    return (
        <div>
            <NavComponent/>
            <div className="row">
                <div className="col-lg-3">
                    <h2>Biography</h2><br/>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet ante ac lacus laoreet dictum eget nec nibh. Aliquam erat volutpat. Ut 
                        vestibulum, mi consectetur ullamcorper lobortis, risus metus iaculis turpis, at maximus diam leo in tortor. Aliquam consequat nunc sit amet augue 
                        dignissim volutpat. Ut eu metus quis mauris porta malesuada sit amet viverra justo. Maecenas vitae blandit tellus. Proin tincidunt facilisis felis, 
                        eu rhoncus mi. Maecenas vehicula lobortis lectus, vel tincidunt erat convallis nec. Praesent eu odio massa. Aenean et mattis ante. Cras nec purus 
                        ipsum. Nullam pharetra ex eget mauris viverra, eget pellentesque odio rhoncus. Morbi quis risus metus. Morbi a molestie odio, vel bibendum ante. 
                        Vivamus placerat tellus sit amet egestas feugiat. Maecenas interdum risus vel purus convallis, eu blandit justo ultrices.
                        Donec eu augue a nibh aliquet tristique at id ante. Vivamus sit amet ex non mi ullamcorper pharetra. Quisque tincidunt vestibulum eleifend. Mauris eu 
                        semper urna. Vivamus consequat, mauris ut euismod aliquet, odio dui suscipit eros, eget cursus nunc justo sed sapien. Vestibulum blandit cursus lectus,
                        a posuere nisl ultrices sit amet. Curabitur et sapien diam. Integer sit amet metus tincidunt, egestas metus gravida, egestas justo. Fusce a vehicula 
                        enim, non suscipit urna. Suspendisse ligula est, suscipit id ligula condimentum, ultricies aliquet diam. Ut eget pulvinar metus. Vivamus et varius 
                        mauris. Donec pulvinar malesuada lectus, ut euismod dui sodales vitae. Mauris sit amet tincidunt est. Sed venenatis euismod justo. Nunc accumsan 
                        fermentum lorem, sodales interdum dolor condimentum nec. Pellentesque magna ligula, placerat vitae sem quis, ultrices consectetur quam. Fusce dapibus 
                        orci at vulputate sollicitudin.
                    </p>
                </div>
                <div className="col-lg-9">
                    <Masonry
                    className={'my-gallery-class'} // default ''
                    elementType={'ul'} // default 'div'
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                        {widgetsInHTML}
                    </Masonry>
                </div>
            </div>
        </div>
    );
  }
}
