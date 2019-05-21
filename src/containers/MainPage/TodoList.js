import React, { Component } from 'react';
import ItemList from './ItemList';
import FilterBtn from '../../components/FilterButton';
import InputBox from '../../components/InputBox';
import './css/TodoList.css';

export default class extends Component{
    render(){
        const style_container = {display:"flex", flexDirection:"column", justifyContent:"center" };
        return(
            <section id="todo">
                <div style={style_container}>
                    <h1 style={{textAlign:"center"}}> Detail Todo List</h1>
                    <div>
                        <section style={style_container}>
                            <InputBox onKeyUp={this.props.onKeyUp_input}/>
                            <ItemList list={this.props.list} mode={this.props.mode} eventHandler={{checkBox : this.props.onClick_check, deletion : this.props.onClick_delete}}/>;      
                        </section>
                        
                        <footer className="todo-app__footer" id="todo-footer">
                            <div className="todo-app__total" id="todo-count"> {this.props.list.filter(elem => !elem.isDone).length} lefts </div>
                            <ul className="todo-app__view-buttons">   
                                <FilterBtn text={"All"} mode={"ALL"} onClick={this.props.onClick_filter("ALL")}/>
                                <FilterBtn text={"Active"} mode={"ACTIVE"} onClick={this.props.onClick_filter("ACTIVE")}/>
                                <FilterBtn text={"Completed"} mode={"DONE"} onClick={this.props.onClick_filter("DONE")}/>
                            </ul>
                            <div className="todo-app__clean"> 
                                <button id="clear" onClick={this.props.onClick_clear}> Clear Completed </button> 
                            </div>
                        </footer>

                    </div>
                </div>
            </section>
        );
    }
}