import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
// import 'yue.css/yue.css';
import PasteIcon from '../component/PasteIcon';

@withRouter
@inject("store")
@observer
export default class NotePage extends Component
{
    state = {"selectedTab":"write"};
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
    async save()
    {
        if( this.props.store.active_id <= 0 )
        {
            alert( "请先选择页面要保存到的节点" );
            return false;
        }

        this.props.store.is_editing = false;
        
        setTimeout( async  () => {
            const textbox = document.querySelector(".contentbox");
            if( textbox )
            {
                let title = textbox.innerText.split('\n', 1)[0];
                if( !title ) title = textbox.innerText.substr( 0 , 60 );
                title = title.substr( 0 , 60 );

                if( title.length < 1 ) title = '未命名';

                await this.props.store.save_to_node( this.props.store.active_id , title , this.props.store.current_note_markdown , this.props.store.editing_id );

            }
        }, 1000);
        

        // 
    }

    remove()
    {
        if( !window.confirm("确定要删除此内容吗？删除后不可恢复") ) return false;
        this.props.store.remove_note( this.props.store.editing_id );
    }
    
    render()
    {
        return <div className="notepage">
                <div className="toolbar">
                    
                    { this.props.store.is_editing ? <><div>
                    
                    <Button icon="arrow-left" onClick={()=>this.props.store.is_editing = false } minimal={true}/>

                    <Button icon="floppy-disk" onClick={()=>this.save() } minimal={true}/>

                    </div>
                    <Button icon="cross" onClick={()=>this.remove()} minimal={true}/>
                    </>
                    :
                    
                    <>
                    <PasteIcon/>
                    <Button icon="edit" minimal={true} onClick={()=>this.props.store.is_editing = !this.props.store.is_editing }/> 
                   

                    </>
                    }
                    
                    
                    
                </div>
                <div className="contentbox">
                    { this.props.store.is_editing ?
                    <ReactMde
                        selectedTab={this.state.selectedTab}
                        onTabChange={(tab)=>this.setState({"selectedTab":tab})}
                        onChange={md=>this.props.store.current_note_markdown=md}

                        l18n={{"write":"编辑","preview":"预览"}}
                        value={this.props.store.current_note_markdown}

                        minEditorHeight={"calc( 100vh - 150px )"}
                        generateMarkdownPreview={(markdown) => 
                              Promise.resolve(<ReactMarkdown source={markdown} />)}
                        />
                    : 
                    <div className="mde-preview">
                        <div className='mde-preview-content'>
                            <ReactMarkdown source={this.props.store.current_note_markdown} />
                        </div>
                    </div>
                    }
                    
                </div>
            </div>;
    }
}