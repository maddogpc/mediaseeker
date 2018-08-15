import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import NavComponent from '../components/NavComp.jsx';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import styled from 'styled-components';
import SessionActions from '../actions/SessionActions.js';
import SessionStore from '../stores/SessionStore.js';
export default class Media extends Flux.View {
  constructor(){
        super();
        this.state = {
            media: []
        };
    }
    
    componentDidMount() {
        let user = localStorage.getItem('username');
        let url = 'https://mediamatchserver-madechai.c9users.io/getmediashort/'+user;
        fetch(url, {
            method: 'GET', // or 'PUT'
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => this.setState({media: response}));
    }
    
  redirect(url) {
        this.props.history.push(url);
    }
  
  render() {
    // console.log(this.state.media);
    const columns = [
    { title: 'Creator/Title', dataIndex: 'creator_or_title', key: 'creator_or_title', width: 300 },
    { title: 'Media Type', dataIndex: 'content_type', key: 'content_type', width: 200 },
    {
        dataIndex: '',
        key: 'd',
            render() {
              return <a href="#">Remove</a>;
            },
        },
    ];
    const data = this.state.media;
    
    return (
        <div>
            <NavComponent redirect={(url) => this.redirect(url)}/>
            <br/>
            <center>
                <Table columns={columns} data={data} />
            </center>
        </div>
    );
  }
}
