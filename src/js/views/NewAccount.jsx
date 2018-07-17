import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
//include images into your bundle
import rigoImage from '../../img/rigo-baby.jpg';
import ButtonComponent from '../components/ButtonComponent.jsx';
import LoginStore from '../stores/LoginStore.js';
import LoginActions from '../actions/LoginActions.js';

export default class NewAccount extends Flux.View {
    constructor (props) {
        super(props);
        this.state = {
            userName:'',
            email:'',
            gender:'',
            city:'',
            state:'',
            zip:'',
            password:''
            
        };
        
    }
    componentDidMount(){
        this.bindStore(LoginStore,()=> {
            console.log('yolo');
            this.props.history.push('/user');
        });
    }
  
    handleInput (object, num) {
        LoginActions.addUser(object, num);
    }
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-4">Fluid jumbotron</h1>
                    <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-2 col-form-label">UserName</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="text" placeholder="Default input" onChange={(e) => this.setState({name: e.target.value})} value={this.state.userName} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="text" placeholder="Default input"id="staticEmail" onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})} value={this.state.password}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Re-Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control"  placeholder="Re-Password" onChange={(e) => this.setState({password: e.target.value})} value={this.state.password}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-8">
                                <label htmlFor="date" className="col-sm-2 col-form-label">date of birth</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="date" id="date" onChange={(e) => this.setState({DOB: e.target.value})} />
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">gender</label>
                                <select id="inputGender" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>male</option>
                                    <option>female</option>
                                </select>
                            </div>
                            
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity">City</label>
                                <input type="text" className="form-control" id="inputCity" onChange={(e) => this.setState({city: e.target.value})} value={this.state.city}/>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Zip</label>
                                <input type="text" className="form-control" id="inputZip" onChange={(e) => this.setState({zip: e.target.value})} value={this.state.zip}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                                <label className="form-check-label" htmlFor="invalidCheck">
                                    Agree to terms and conditions
                                </label>
                                <div className="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                            </div>
                        </div>
                    </form>
                    <p className="lead mx-auto text-center">
                        <Link className="text-center text-uppercase" to="/wizard" onClick={()=> this.handleNewUser({
                                                                                                                        email:this.state.email,
                                                                                                                        userName:this.state.userName,
                                                                                                                        DOB:this.state.DOB,
                                                                                                                        city:this.state.city,
                                                                                                                        zip:this.state.zip,
                                                                                                                        password:this.state.password
                                                                                                                    })}>Next</Link>
                    </p>
                </div>
                
            </div>
        );
    }
}
