import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import NoteListItem from '../component/NoteListItem';

@withRouter
@inject("store")
@observer
export default class NoteList extends Component
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
    
    render()
    {
        return <div className="notelist">
        { this.props.store.current_note_list && this.props.store.current_note_list.map( item => <NoteListItem data={item} key={item._id} /> ) }
        </div>;
    }
}