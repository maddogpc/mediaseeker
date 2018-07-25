import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import * as EmailValidator from 'email-validator';
//include images into your bundle
import rigoImage from '../../img/rigo-baby.jpg';
import ButtonComponent from '../components/ButtonComponent.jsx';
import SessionActions from '../actions/SessionActions.js';
import SessionStore from '../stores/SessionStore.js';

export default class NewAccount extends Flux.View {
    constructor (props) {
        super(props);
        this.checkInput = this.checkInput.bind(this);
        this.state = {
            userName:'',
            email:'',
            password:'',
            repassword:'',
            birthdate: '',
            gender:'',
            city:'',
            state:'',
            zip:'',
            checked: false
        };
        
    }
    componentDidMount(){
        this.createProfileSubscription = SessionStore.subscribe("createProfile", (data) => {
            if (data == "username is already taken") {
                alert(data);
            }
            else if (data == "email is already taken") {
                alert(data);
            }
            else {
                SessionActions.loginAction(data.user_name, data.password);
            }
        });
        this.loginSubscription = SessionStore.subscribe("login", (data) => {
            if (data.username !== "undefined") {
                this.props.history.push('/profile');
            }
        });
    }
  
    checkInput() {
        let username = this.state.userName;
        let email = this.state.email;
        let password = this.state.password;
        let repassword = this.state.repassword;
        let birthdate = this.state.birthdate;
        let gender = this.state.gender;
        let city = this.state.city;
        let state = this.state.state;
        let zip = this.state.zip;
        let checked = this.state.checked;
        
        let userNameBool = username !== "";
        let emailBool = EmailValidator.validate(email); 
        let passwordBool = password !== "";
        let passwordEqualBool = password == repassword;
        let birthdateBool = birthdate !== "";
        let genderBool = gender !== "Choose...";
        let cityBool = city !== "";
        let stateBool = state !== "Choose...";
        let zipBool = zip !== "";
        let checkedBool = checked;
        
        if (!userNameBool) {
            alert("username is not valid");
        }
        else if (!emailBool) {
            alert("email is not valid");
        }
        else if (!passwordBool) {
            alert("password is not valid");
        }
        else if (!passwordEqualBool) {
            alert("passwords are not equal");
        }
        else if (!birthdateBool) {
            alert("birthdate is not valid");
        }
        else if (!genderBool) {
            alert("gender is not valid");
        }
        else if (!cityBool) {
            alert("city is not valid");
        }
        else if (!stateBool) {
            alert("state is not valid");
        }
        else if (!zipBool) {
            alert("zip is not valid");
        }
        else if (!checkedBool) {
            alert("you did not review the terms of service");
        }
        else {
            SessionActions.createProfileAction(username, email, password, birthdate, gender, city, state, zip);
        }
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
                                <input className="form-control" type="text" placeholder="Default input" onChange={(e) => this.setState({userName: e.target.value})} value={this.state.userName} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="text" placeholder="Default input" id="staticEmail" onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})} value={this.state.password}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="reInputPassword" className="col-sm-2 col-form-label">Re-Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="reInputPassword" placeholder="Re-Password" onChange={(e) => this.setState({repassword: e.target.value})} value={this.state.repassword}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-8">
                                <label htmlFor="date" className="col-sm-2 col-form-label">date of birth</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="date" id="date" onChange={(e) => this.setState({birthdate: e.target.value})} />
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">gender</label>
                                <select id="inputGender" className="form-control" onChange={(e) => this.setState({gender: e.target.value})}>
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
                                <select id="inputState" className="form-control" onChange={(e) => this.setState({state: e.target.value})}>
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Zip</label>
                                <input type="text" className="form-control" id="inputZip" onChange={(e) => this.setState({zip: e.target.value})} value={this.state.zip}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onChange={(e) => this.setState({checked: e.target.checked})} value="" id="invalidCheck" required/>
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
                        <button type="button" className="btn  text-center " onClick={this.checkInput}>Next</button>
                    </p>
                </div>
                
            </div>
        );
    }
}
