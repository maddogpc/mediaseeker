import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class PostComponent extends React.Component{
    
    render(){
        return (
            <div className="card w-100">
                <div className="card-body">
                    <h5 className="card-title">Post it</h5>
                    <div className="text-center">
                        <h2>What type of widget do you want to add?</h2>
                        <select className="form-control d-inline-block mb-2 w-25" ref={(el) => this.selectRef = el} onChange={(event) => this.selectionChange(event)} name="WidgetType" form="WidgetForm" >
                            <option value="None">None</option>
                            <option value="Book">Book</option>
                            <option value="YoutubePlayer">Youtube Player</option>
                            <option value="TextBox">Text Box</option>
                        </select>
                        {this.state.isBook ? (
                            <form>
                                <div className="form-row align-items-center justify-content-center">
                                    <div className="col-auto ">
                                        <label className="sr-only" htmlFor="FirstInput">Picture 1 url</label>
                                        <input ref={(el) => this.picture1Ref = el} type="text" className="form-control mb-2 mr-sm-2" id="FirstInput" placeholder="Picture 1 url"/>
                                    </div>
                                    <div className="col-auto">
                                        <label className="sr-only" htmlFor="SecondInput">Picture 2 url</label>
                                        <input ref={(el) => this.picture2Ref = el} type="text" className="form-control mb-2 mr-sm-2" id="SecondInput" placeholder="Picture 2 url"/>
                                    </div>
                                    <div className="col-auto ">
                                        <label className="sr-only" htmlFor="FirstInput">Author</label>
                                        <input ref={(el) => this.authorRef = el} type="text" className="form-control mb-2 mr-sm-2" id="FirstInput" placeholder="Author"/>
                                    </div>
                                    <div className="col-auto">
                                        <label className="sr-only" htmlFor="SecondInput">Title</label>
                                        <input ref={(el) => this.titleRef = el} type="text" className="form-control mb-2 mr-sm-2" id="SecondInput" placeholder="Title"/>
                                    </div>
                                    <div className="col-auto">
                                        <button onClick={() => this.addBook()} type="button" className="btn btn-primary mb-2">Add</button>
                                    </div>
                                </div>
                            </form>    
                        ) : ""}
                        {this.state.isYoutube ? (
                            <div>
                                <ul className="list-group mx-auto" id="VideoList">{/*{videos}*/}</ul>
                                <form>
                                    <div className="form-row align-items-center justify-content-center">
                                        <div className="col-auto ">
                                            <label className="sr-only" htmlFor="FirstInput">Name</label>
                                            <input ref={(el) => this.nameRef = el} type="text" className="form-control mb-2 mr-sm-2" id="FirstInput" placeholder="Name"/>
                                        </div>
                                        <div className="col-auto">
                                            <label className="sr-only" htmlFor="SecondInput">Artist</label>
                                            <input ref={(el) => this.artistRef = el} type="text" className="form-control mb-2 mr-sm-2" id="SecondInput" placeholder="Artist"/>
                                        </div>
                                        <div className="col-auto">
                                            <label className="sr-only" htmlFor="ThirdInput">Url</label>
                                            <input ref={(el) => this.urlRef = el} type="text" className="form-control mb-2 mr-sm-2" id="ThirdInput" placeholder="Youtube Url"/>
                                        </div>
                                        <div className="col-auto">
                                            <button onClick={() => this.addVideo()} type="button" className="btn btn-primary mb-2">Add</button>
                                        </div>
                                        
                                    </div>
                                    {this.state.hasVideos ? (
                                        <button onClick={() => this.setState({showModal: true})} type="button" className="btn btn-success mb-2">Submit</button>
                                        ) : ""}
                                </form>
                                
                            </div>
                        ) : ""}
                        {this.state.isTextBox ? (
                            <form>
                                <div className="form-row align-items-center justify-content-center">
                                    <div className="col-auto ">
                                        <label className="sr-only" htmlFor="FirstInput">Link to article</label>
                                        <input ref={(el) => this.linkArticleRef = el} type="text" className="form-control mb-2 mr-sm-2" id="FirstInput" placeholder="Link to article"/>
                                    </div>
                                </div>
                                <textarea ref={(el) => this.textAreaRef = el} rows="8" cols="50">
                                    Write your own thoughts and opinions here.
                                </textarea><br/>
                                <button onClick={() => this.addTextBox()} type="button" className="btn btn-success mb-2">Submit</button>
                            </form>
                        ) : ""}
                        {/*Modal*/}
                        <div className="modal" tabIndex="-1" role="dialog" style={{display: (this.state.showModal) ? 'inline-block' : 'none'}}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">What would you like to name the widget?</h5>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" name="playlistname" ref={(el) => this.widgetTitleRef = el}/>
                                    </div>
                                    <div className="modal-footer">
                                        <button onClick = {() => this.setState({showModal: false})} type="button" className="btn btn-primary">Cancel</button>
                                        <button onClick = {this.saveWidget} type="button" className="btn btn-secondary" data-dismiss="modal">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Modal*/}
                    </div>
                </div>

            </div>
        );
    }
}

export default PostComponent;