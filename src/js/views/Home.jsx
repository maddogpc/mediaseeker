import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
//include images into your bundle
import rigoImage from '../../img/rigo-baby.jpg';
import ButtonComponent from '../components/ButtonComponent.jsx';
import NavComponent from '../components/NavComp.jsx';
import LoginActions from '../actions/LoginActions.js';
import LoginStore from '../stores/LoginStore.js';
export default class Home extends Flux.View {
  constructor(){
        super();
    
        this.state = {
            showModal: false,
            user: LoginStore.getUser()
            
        };
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((resp) => {
                return resp.json();
            })
            .then((user) =>{
                this.setState( {User: user});
            }).catch((error) =>{
                console.log("there was an error:",error);
            });
       
    }
  
    componentDidMount(){
        this.bindStore(LoginStore,()=> {
            console.log('final step');
            // this.props.history.push('/contacts');
            this.setState({
                user: LoginStore.getUser()
            });
        });
    }
  
  handelRequest(object, num){
      console.log("handel request");
      LoginActions.loginRequest(object, num);
  }
  
  
  render() {
    return (
        <div>
            <NavComponent/>
            <div className="jumbotron w-75 pt-3 mx-auto">
                <h1 className="display-4 text-center">Welcom to Migo</h1>
                <form className='align-middle'>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">User Name/Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => this.setState({email: e.target.value})} value={this.state.email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})} value={this.state.password}/>
                    </div>
                    <p className="mx-auto text-center text-white">
                        <button type="submit" className="btn  text-center " onClick={() => this.handelRequest({email:this.state.email, password:this.state.password})}>Sign in </button>
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
