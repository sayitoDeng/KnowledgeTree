import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Tree from 'react-ui-sortable-tree';
import 'react-ui-sortable-tree/dist/react-ui-tree.css';
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
    
    state = {"canMoveNode":false};
    componentDidMount()
    {
       this.props.store.init_tree();
    }

    // componentDidUpdate(prevProps)
    // {
    //     if (this.props.data !== prevProps.data) 
    //     {
           
    //     }
    // }
    add()
    {
        this.props.store.tree_add_node();
        this.forceUpdate();
    }
    updateMoveNodeState(value) {
         this.setState(value,()=>{
            console.log(this.state)
         })
         
      }
    render()
    {
        return <div className="sidebar">
            <div className="treebox">
                <Tree  
                    canMoveNode={ ()=>this.state}
                    renderNode={node=><TreeNode onUpdate={()=>this.forceUpdate()} data={node}/>}
                    tree={this.props.store.current_tree}
                    onChange={ tree => this.props.store.update_tree(tree)  } 
                    
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