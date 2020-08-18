import { observable, action } from "mobx";
import axios from 'axios';
import { ObjectID } from 'bson';
import api from '../util/api';

const APIBASE =  'http://localhost:3001/';

function remove_tree_node( object , id  )
{
  object.children =  object.children.filter( item => item._id != id );
  object.children.forEach( item => remove_tree_node( item , id ) );
  return object;
}
function check_data(data){
  if(data.error=='-NOTLOGIN-') window.location='/login';
}
class AppState
{
    @observable appname = "MARKDOWN"; 
    @observable is_editing = false;

    @observable editing_id = 0;
    @observable active_id = 0;
    @observable search_text = "";
    @observable view_type=0;
    constructor()
    {
      const token  = window.localStorage.getItem("FTTREE_TOKEN");
      if( token ) api.setToken( token );
    }
    @action save_token(token){
      api.setToken(token);
      window.localStorage.setItem("FTTREE_TOKEN",token);
    }
    @action async login(nickname,password){
      let params = {};
      params['nickname'] = nickname;
      params['password'] = password;
      return await api.post(APIBASE+'login',params)
    }
    @action set_markdown( markdown )
    {
      this.current_note_markdown = markdown;
      this.is_editing = true;
      this.editing_id = 0;
    }

    @action async save_to_node( parent_node_id , title , content, id = 0 )
    {
      let params = {};
      params.append("parent_node" , parent_node_id );
      params.append("title" , title );
      params.append("content" , content );
      params.append("id" , id );
      const {data} = await api.post( APIBASE+'notes/save' , params );
      if( data && this.active_id != 0 ) await this.load_notes( this.active_id );
      if( data && data._id ) this.editing_id = data._id;
    }

    @action async remove_note( node_id )
    {
      let params = {};
      params.append("id" , node_id);
      const {data} = await api.post( APIBASE+'notes/remove' , params );
      if( data )
      {
        if( this.editing_id != 0 )
        {
          this.load_notes( this.editing_id );
        }

        this.current_note_markdown = '';
        this.is_editing = false;
        this.editing_id = 0;
        
      } 
    }

    @action async load_notes( node_id )
    {
      
      var params = new URLSearchParams();
      params.append("parent_node" , node_id );
      const {data} = await api.post( APIBASE+'notes/list' , params );
      this.current_note_list = data;
    }

    @action async load_note( node_id )
    {
      var params = new URLSearchParams();
      params.append("id" , node_id );
      const {data} = await api.post( APIBASE+'notes/detail' , params );
      
      if( data && data.content )
      {
        this.current_note_markdown = data.content;
        this.editing_id = data._id;
      }
    }

    @action async search( text )
    {
      var params = new URLSearchParams();
      params.append("text" , text );
      
      const {data} = await api.post( APIBASE+'notes/search' , params );
      
      if( data && Array.isArray( data ) )
      {
        this.current_note_list= data;
      }
    }
    
    
    
    @action async init_tree()
    {
      const {data} = await api.post( APIBASE+'nodes' );
      if( data ) 
      {
        console.log( data );
        this.current_tree = data;
      
      }
    }

    @action async tree_remove_node( id )
    {
      this.current_tree = remove_tree_node( {...this.current_tree} , id );
      await this.update_tree();
    }

    @action async update_tree( tree = null )
    {
      if( !tree ) tree = this.current_tree;
      
      var params = new URLSearchParams();
      params.append("tree" , JSON.stringify(tree.children));
      const {data} = await api.post( APIBASE+'nodes/update' , params );
      if( data ) this.current_tree = data;
    }

    

    @action async tree_add_node()
    {
      const new_node = {
        _id:new ObjectID(),
        module:"未命名",
        children:[],
        collapsed:false,
        created_at:Date.now() 
      } ;
      this.current_tree.children.push(new_node);
      
      console.log( JSON.stringify(this.current_tree) );
    }
    
    @observable current_tree = {};
    @observable current_note_list = [];
    @observable current_note_markdown = "";



}

export default new AppState();