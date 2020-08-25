import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Tree from 'react-ui-sortable-tree-drag';
import 'react-ui-sortable-tree-drag/dist/react-ui-tree.css';
import TreeNode from '../component/TreeNode';
import { Button } from '@blueprintjs/core';
import SearchBar from '../component/SearchBar';

@withRouter
@inject("store")
@observer
export default class Sidebar extends Component
{
    constructor(props) 
    {
        super(props);
        
       // this.setSelfState =this.setSelfState.bind(this)
        
    }
    
    state = {"canDrag":true};
    componentDidMount()
    {
       this.props.store.init_tree();
    }

    // componentDidUpdate(prevProps)
    // {
    //     
    // }
    add()
    {
        this.props.store.tree_add_node();
        this.forceUpdate();
    }
    changeDragStatus(status){
        this.setState({"canDrag":status});
    }
    render()
    {   
        return <div className="sidebar">
            <div className="treebox">
                <Tree  
                    renderNode={node=><TreeNode canDrag={this.state.canDrag} changeStatus={(status)=>this.changeDragStatus(status)} onUpdate={()=>this.forceUpdate()} data={node}/>}
                    tree={this.props.store.current_tree}
                    onChange={ tree => this.props.store.update_tree(tree)  } 
                    canDrag={this.state.canDrag}
                   // canDrag={this.props.store.canDrag}
                />
            </div>
            <div className="toolbar">
                <div>
                    <Button icon="blocked-person" onClick={()=>this.props.history.push("/logout")} minimal={true}/>
                    <Button icon="plus" onClick={()=>this.add()} minimal={true}/>
                </div>
                <SearchBar/>
            </div>
        </div>;
    }
}