import React, { Component } from 'react';
import Calendar from 'react-calendar';
export default class extends Component{
    constructor(){
        super();
        this.state = {
            date: new Date((new Date()).toLocaleDateString()),
        }
    }
    onChange = date => this.setState({ date });
    render() {
    return (
        <div style={{display:"flex", justifyContent:"center", margin:"1em"}}>
        <Calendar
            onChange={this.onChange}
            value={this.state.date}
            locale="en"
            // onClickDay={(value) => alert('Clicked day: ', value)} 點擊時取得當日 todo 
        />
        </div>
    );
    }
}