import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject("store")
@observer
export default class NoteListItem extends Component
{
    // constructor(props) 
    // {
    //     super(props);
    // }
    
    // componentDidMount()
    // {
    //    // 
    // }

    // componentDidUpdate(prevProps)
    // {
    //     if (this.props.data !== prevProps.data) 
    //     {
           
    //     }
    // }
    
    async show(e)
    {
        await this.props.store.load_note( this.props.data._id );
        if(this.props.store.view_type == 2){
            this.props.store.view_type =3;
        }
    }
    
    render()
    {
        const active_class = this.props.store.editing_id == this.props.data._id ? ' active ':'';
        
        return <div className={"item"+active_class} onClick={e=>this.show(e)}>{this.props.data.title}</div>;
    }
}