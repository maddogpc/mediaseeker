import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import NavComponent from '../components/NavComp.jsx';
import SessionActions from '../actions/SessionActions.js';
import SessionStore from '../stores/SessionStore.js';
export default class Home extends Flux.View {
  constructor(){
        super();
        this.state = {
            user: "",
            password: ""
        };
    }
    
    componentDidMount() {
        this.loginSubscription = SessionStore.subscribe("login", (data) => {
            if (data.username !== "undefined") {
                this.props.history.push('/feed');
            }
        });
    }
  
  render() {
    return (
        <div className="container-fluid">
            <NavComponent/>
            <div className="jumbotron w-75 pt-3 mx-auto">
                <h1 className="display-4 text-center">Welcom to Migo</h1>
                <form className='align-middle'>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">User Name/Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => this.setState({user: e.target.value})} value={this.state.user}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})} value={this.state.password}/>
                    </div>
                    <p className="mx-auto text-center text-white">
                        <button type="button" className="btn  text-center " onClick={() => SessionActions.loginAction(this.state.user, this.state.password)}>Sign in </button>
                    </p>
                </form>
                
                <p className="lead mx-auto text-center">
                    <Link className="text-center text-uppercase" to="/adduser" >Creat Account</Link>
                </p>
            </div>
        </div>
    );
  }
}
