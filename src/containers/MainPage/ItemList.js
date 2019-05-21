import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Node from '../../components/ItemNode';

class ItemList extends Component{
    render(){
        let filteredList = this.props.list.filter(elem => {
            switch(this.props.mode){
                case "ALL":    return true;
                case "ACTIVE": return(elem.isDone !== true);
                case "DONE":   return (elem.isDone === true);
                default: return false;
            }
        });
        let displayList = filteredList.map(
            elem => <Node context={elem.context} id={elem.id} isDone={elem.isDone} 
                                    onChange_CheckBox={this.props.eventHandler.checkBox} 
                                    onClick_Deletion={this.props.eventHandler.deletion} />
        );
        return <ul id="todo-list"> {displayList} </ul> ;
    }
}
ItemList.propTypes = {
    list : PropTypes.array.isRequired,
    mode : PropTypes.string.isRequired
};
ItemList.defaultProps = {
    list : [],
    mode : "ALL"
}

export default ItemList;
