import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
//include images into your bundle
import rigoImage from '../../img/rigo-baby.jpg';
import ButtonComponent from '../components/ButtonComponent.jsx';

export default class Wizard extends Flux.View {
  render() {
    return (
        <div className="jumbotron">
            <div className="jumbotron">
                <h1 className="display-4">Let, us know what you like?!</h1>
                <div className="card-deck">
                    <div className="card p-3">
                        <blockquote className="blockquote mb-0 card-body">
                            <h1 className="text-center text-uppercase align-middle">Movies <i className="fas fa-film"></i></h1>
                        </blockquote>
                    </div>
                    <div className="card">
                        <div className="image image1"></div>
                        <div className="card-body">
                            <h5 className="card-title">Action</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image2"></div>
                        <div className="card-body">
                            <h5 className="card-title">Romance</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image3"></div>
                        <div className="card-body">
                            <h5 className="card-title">Comady</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image4"></div>
                        <div className="card-body">
                            <h5 className="card-title">Drama</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image5"></div>
                        <div className="card-body">
                            <h5 className="card-title">Si-Fi</h5>
                        </div>
                    </div>
                </div>
                <div className="card-deck pt-4">
                    <div className="card p-3">
                        <blockquote className="blockquote mb-0 card-body">
                            <h1 className="text-center text-uppercase align-middle">vidio game <i className="fas fa-gamepad"></i></h1>
                        </blockquote>
                    </div>
                    <div className="card">
                        <div className="image image6"></div>
                        <div className="card-body">
                            <h5 className="card-title">Action</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image7"></div>
                        <div className="card-body">
                            <h5 className="card-title">FPS</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image8"></div>
                        <div className="card-body">
                            <h5 className="card-title">RPG</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image9"></div>
                        <div className="card-body">
                            <h5 className="card-title">MMO</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image10"></div>
                        <div className="card-body">
                            <h5 className="card-title">stratgy</h5>
                        </div>
                    </div>
                </div>
                <div className="card-deck pt-4">
                    <div className="card p-3">
                        <blockquote className="blockquote mb-0 card-body">
                            <h1 className="text-center text-uppercase align-middle">Musice <i className="fas fa-music"></i></h1>
                        </blockquote>
                    </div>
                    <div className="card">
                        <div className="image image11"></div>
                        <div className="card-body">
                            <h5 className="card-title">Rock</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image12"></div>
                        <div className="card-body">
                            <h5 className="card-title">Rege</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image13"></div>
                        <div className="card-body">
                            <h5 className="card-title">hip-hop</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image14"></div>
                        <div className="card-body">
                            <h5 className="card-title">Electronic</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image15"></div>
                        <div className="card-body">
                            <h5 className="card-title">Salsa</h5>
                        </div>
                    </div>
                </div>
                <div className="card-deck pt-4">
                    <div className="card p-3">
                        <blockquote className="blockquote mb-0 card-body">
                            <h1 className="text-center text-uppercase align-middle">books <i className="fas fa-book-open"></i></h1>
                        </blockquote>
                    </div>
                    <div className="card">
                        <div className="image image16"></div>
                        <div className="card-body">
                            <h5 className="card-title">biografis</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image17"></div>
                        <div className="card-body">
                            <h5 className="card-title">non-fiction</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image18"></div>
                        <div className="card-body">
                            <h5 className="card-title">fiction</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image19"></div>
                        <div className="card-body">
                            <h5 className="card-title">self help</h5>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image image20"></div>
                        <div className="card-body">
                            <h5 className="card-title">for dummys</h5>
                        </div>
                    </div>
                </div>
                <p className="lead mx-auto text-center pt-4">
                    <Link className="text-center text-uppercase" to="/feed" >ready</Link>
                </p>
            </div>
        </div>
    );
  }
}