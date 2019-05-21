import React, { Component } from 'react';
import PopForm from './PopForm';
import Calendar from '../../components/Calendar'
import { NavLink, Route, Redirect } from 'react-router-dom';
export default class extends Component{
    constructor(){
        super();
        this.state = {
            isFormPop : false,
            navMode   : "nav1",
        }
    }
    handleOnOffForm = OnOff => event => {
        this.setState(state => ( {isFormPop: OnOff}));
    }
    handleNavigation = mode => event => {
        document.getElementById(this.state.navMode).className = "";
        this.setState({navMode : mode});
        event.target.className = "active";
    }

    render(){
        const { email, userName, onClick_add, onPageChange, onLogOut } = this.props;
        return(
            <section id="dashBoard">
                <header>
                    <span className="image avatar"><img src="/images/1.png" alt="" /></span>
                    <h1>{userName}</h1>
                </header>
                <nav id="nav">
                    <ul>
                        <Route exact path= '/' component={() => <Redirect to='/todolist'/>} />
                        <li><NavLink to="/todolist">Todo List</NavLink></li>
                        <li><NavLink to="/taskmap/map">Google Map</NavLink></li>
                        <li><NavLink to="/taskmap/trafficinfo">Traffic Information</NavLink></li>
                        <li><a onClick={event => {onPageChange(); onLogOut()}}>  Log out / Save </a></li>
                        
                    </ul>
                </nav>
                <Calendar/>
                <Route path="/todolist" component={()=> <p className="formBtn" onClick={this.handleOnOffForm(true)}>Create TODO</p>} />
                <PopForm isFormPop={this.state.isFormPop} onClose={this.handleOnOffForm} onClick_add={onClick_add} email={email}/>
                
                <footer></footer>
            </section>
        )
    }
}
