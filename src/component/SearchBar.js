import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, ControlGroup, InputGroup } from '@blueprintjs/core';
import { Hotkey, Hotkeys, HotkeysTarget, Alert } from '@blueprintjs/core/lib/esnext/components/';


@withRouter
@inject("store")
@HotkeysTarget
@observer
export default class SearchBar extends Component
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
    paste( e )
    {
        console.log(e.target);
        //alert("1");
    }

    async search(e)
    {
        //
        await this.props.store.search( this.props.store.search_text );
        if( this.props.store.view_type == 1 ) this.props.store.view_type = 2;
    }

    enter( e )
    {
        const key = e.which || e.keyCode;
        if( key == 13 ) this.search();
        // console.log( key );
    }

    renderHotkeys()
    {
        return <Hotkeys>
        <Hotkey label="paste" combo="mod+v" allowInInput={true} onKeyDown={(e)=>this.paste(e)} preventDefault={true} stopPropagation={true}/>

        </Hotkeys>;
    }
    
    render()
    {
        return <ControlGroup fill={true} vertical={false}>
            <InputGroup leftIcon="search" className="search-input" placeholder="关键字" value={this.props.store.search_text} onChange={e=>this.props.store.search_text=e.target.value} onKeyDown={e=>this.enter(e)} />
            <Button text="搜索" onClick={e=>this.search(e)}/>
        </ControlGroup>;
    }
}