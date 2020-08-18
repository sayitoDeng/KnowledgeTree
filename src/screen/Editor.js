import React, { Component } from 'react';
import {observer,inject} from 'mobx-react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Sidebar from '../component/Sidebar';
import NoteList from '../component/NoteList';
import NotePage from '../component/NotePage';
import Navbar from '../component/Navbar';
@withRouter
@inject("store")
@observer
export default class Editor extends Component {
    componentDidMount(){
        if(window.innerWidth<800){
            this.props.store.view_type = 1;
        }

    }
    
    render() {
        const view_type = this.props.store.view_type;
        const main = <><Navbar/><div className="editorbox">

            { (view_type == 0 || view_type == 1) && <Sidebar/> }
            { (view_type == 0 || view_type == 2) && <NoteList/> }
            { (view_type == 0 || view_type == 3) && <NotePage/> }
            
        </div></>;
        return <DocumentTitle title={this.props.store.appname}>{main}</DocumentTitle>
    }
}
