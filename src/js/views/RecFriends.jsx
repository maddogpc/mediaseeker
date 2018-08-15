/* eslint-disable no-console,func-names,react/no-multi-comp */
import React from 'react';
import ReactDOM from 'react-dom';
import Flux from "@4geeksacademy/react-flux-dash";
import NavComponent from '../components/NavComp.jsx';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import MediaActions from '../actions/MediaActions.js';
import MediaStore from '../stores/MediaStore.js';
export default class TableTest extends Flux.View {
    constructor(){
        super();
        this.state = {
            data: [],
            expandedRowKeys: [],
            expandIconAsCell: true,
            expandRowByClick: false,
            mediaShort: []
        };
        this.onExpand = this.onExpand.bind(this);
        this.createTableData = this.createTableData.bind(this);
        this.expand = this.expand.bind(this);
        this.extra = this.extra.bind(this);
        this.showMediaShort = this.showMediaShort.bind(this);
    }
    
    redirect(url) {
        this.props.history.push(url);
    }
    
    componentDidMount() {
        let user = localStorage.getItem('username');
        let url = 'https://mediamatchserver-madechai.c9users.io/getrecommendedfriends/'+user;
        fetch(url, {
            method: 'GET', // or 'PUT'
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => this.createTableData(response));
        
        // this.mediaShortSubscription = MediaStore.subscribe("getMediaShort", (data) => {
        //     console.log(data);
        //     let mediaShort = data.response;
            
        // });
        // MediaActions.getMediaShort(user);
    }
    
    createTableData(data) {
        let newData = [];
        for (let i=0; i<data.length; i++) {
            let newRow = data[i];
            newRow.key = i;
            newRow.percent_similar = parseInt(data[i].percent_similar)+"%";
            newData.push(newRow);
            console.log(newRow);
            MediaActions.getMediaShort(newRow.friend.user_name);
        }
        let mediaShort = MediaStore.getMediaShortFromStore();
        this.setState({data: newData, mediaShort: mediaShort});
    }
    
    expand(e) {
        console.log(e.target.parentElement.parentElement);
        let row = e.target.parentElement.parentElement;
        console.log(row.getAttribute("data-row-key"));
        let rowkey = parseInt(row.getAttribute("data-row-key"));
        let expandedRowKeys = this.state.expandedRowKeys;
        let found = false;
        for (let i=0; i<expandedRowKeys.length; i++) {
            if (expandedRowKeys[i] === rowkey) {
                expandedRowKeys.splice(i, 1);
                found = true;
            }
        }
        if (found === false) {
            expandedRowKeys.push(rowkey);
        }
        this.setState({expandedRowKeys});
    }

    onExpand(expanded, record) {
        console.log('onExpand', expanded, record);
    }
    
    extra(username) {
        let url = 'https://mediamatchserver-madechai.c9users.io/getmediashort/'+username;
        fetch(url, {
            method: 'GET', // or 'PUT'
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => this.stapleData(response));
    }
    
    showMediaShort(username) {
        console.log(username);
        let mediaShort = this.state.mediaShort;
        let userMediaShort;
        for (let i=0; i<mediaShort.length; i++) {
            if (mediaShort[i].user === username) {
                userMediaShort = mediaShort[i].response;
                console.log(mediaShort[i]);
            }
        }
        var mediaShortInHTML = userMediaShort.map((eachMediaShort,i) => {
            return <li className="list-group-item list-group-item-action" id={i} key={i}>
            creator_or_title: <b>{eachMediaShort.creator_or_title}</b> / content_type: <b>{eachMediaShort.content_type}</b>
            </li>;
        });
        return mediaShortInHTML;
    }

  

    render() {
        let context = this;
        const columns = [
                { title: 'Username', dataIndex: 'friend.user_name', key: 'friend.user_name', width: 150 },
                { title: 'City', dataIndex: 'friend.city', key: 'friend.city', width: 200 },
                { title: 'State', dataIndex: 'friend.state', key: 'friend.state', width: 100 },
                { title: 'Similarity', dataIndex: 'percent_similar', key: 'percent_similar', width: 100 },
                {
                    dataIndex: '',
                    key: 'd',
                    width: 100,
                        render() {
                            return <button className="btn btn-success" type="button" onClick = {(e) => context.expand(e)}>
                            Show Media</button>;
                        }
                    }
        ];  
    return (
        <div>
            <NavComponent redirect={(url) => this.redirect(url)}/>
            <center>
                <Table
                  columns={columns}
                  expandedRowRender={(record, index, indent, expanded) =>
                    expanded ? <ul> {this.showMediaShort(record.friend.user_name)} </ul> : null
                  }
                  expandedRowKeys={this.state.expandedRowKeys}
                  onExpand={this.onExpand}
                  data={this.state.data}
                />
            </center>
        </div>
    );
  }
}