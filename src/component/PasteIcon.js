import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import TurndownService from 'turndown/lib/turndown.umd.js';
import * as turndownPluginGfm from 'turndown-plugin-gfm';
const turndownService = new TurndownService();
turndownService.use(turndownPluginGfm.gfm);

@withRouter
@inject("store")
@observer
export default class PasteIcon extends Component
{
    componentDidMount()
    {
        document.addEventListener( 'paste' , e=>
        {
             if( this.props.store.is_editing ) return true;
         
             var clipboardData, pastedData;
 
             e.stopPropagation();
             e.preventDefault();
 
             clipboardData = e.clipboardData || window.clipboardData;
             
             pastedData = clipboardData.getData('text/html');
 
             this.props.store.set_markdown(turndownService.turndown(pastedData));
        } ) 
    }

    // componentDidUpdate(prevProps)
    // {
    //     if (this.props.data !== prevProps.data) 
    //     {
           
    //     }
    // }
    
    render()
    {
        return null;
    }
}