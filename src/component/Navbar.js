import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Menu, MenuItem, MenuDivider, ControlGroup, Button, InputGroup } from "@blueprintjs/core";
import {ContextMenuTarget} from '@blueprintjs/core/lib/esnext/components';
@withRouter
@inject("store")
@observer
export default class NoteList extends Component
{

    
    render()
    {
        const title = this.props.title || this.props.store.appname;
        const view_type = this.props.store.view_type;
        return <div className="nav-bar">
            <div className="left">
                {
                    (view_type == 2 || view_type==3)&&
                    <Button icon="chevron-left" large={true}
                    minimal={true} onClick={
                        ()=>this.props.store.view_type--
                    }
                    />
                }
            </div>
            <div className="center">{title}</div>
            <div className="right"></div>
        </div>;
    }
}