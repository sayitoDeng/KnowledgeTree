import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

@withRouter
@inject("store")
@observer
export default class Logout extends Component
{
    componentDidMount(){
        window.localStorage.removeItem("FTTREE_TOKEN");
        this.props.history.replace('/login');
    }
    
    render()
    {
        
        return null;
    }
}