import React, {Component} from 'react';
import './css/PopForm.css';
import DateTimePicker from './../../components/DateTimePicker';
import uuid from 'uuidv4';
import { string } from 'prop-types';

export default class extends Component{
    state = {
        selectedDate: new Date(),
        date: String,
        time: String
    }
    resetState = () =>{
        this.setState({
            selectedDate: new Date(),
            date: String,
            time: String
        })
    }

    handleDateChange = date => {
        this.setState({
            selectedDate: date,
            date: date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
            time: (date.getHours() < 10? '0':'') + date.getHours() + ":" + (date.getMinutes() < 10? '0':'') + date.getMinutes()
        });
    }
    handleSubmit = event => {
        const txt = document.getElementById("todo").value;
        const adr = document.getElementById("adr").value;
        if(txt.trim() !== "" && adr.trim() !== ""){
            const d = this.state.date , t = this.state.time;
            const task = {
                    email: this.props.email,
                    context: txt,
                    location: {
                        address: adr,
                        lat: '',
                        lng: '',
                    },
                    date: d,
                    time: t,
                    id: uuid(),
                    isDone: false,
            }
            // Pass new task to DB
            this.saveTaskToDB(task);

            // update frontend component
            this.resetState();
            this.props.onClose(false)(event); // Close the form
            this.props.onClick_add(task);
            document.getElementById("todo").value = "";
            document.getElementById("adr").value = "";
        }
    }
    saveTaskToDB = async (task) => {
        const option = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        try{
            await fetch('/todolist/form', option);
        }
        catch(err){
            console.log('Unable to save data to DB :'+ err);
        }
    }

    render(){
        return(
            <div id="modal-wrapper" className="modal" style={{
                display: this.props.isFormPop?"flex":"none",
            }}>
                <form className="modal-content animate" id="popForm_todoDetails" action="javascript:void(0)" onSubmit={this.handleSubmit} >                    
                    <div className="imgcontainer">
                        <span onClick={this.props.onClose(false)} className="close" title="Close PopUp">&times;</span>
                        <h1>Create a task</h1>
                    </div>

                    <div>
                        <label htmlFor="todo">Todo thing</label>
                        <input id="todo" type="text" placeholder="What needs to be done?" name="context" required/>
                        <DateTimePicker onChange={this.handleDateChange} selectedDate={this.state.selectedDate} />
                        <label htmlFor="adr">Location</label>
                        <input id="adr" type="text" placeholder="Where to do the task? " name="location" required/>         
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}