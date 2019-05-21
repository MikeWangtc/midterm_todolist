import React, { Component } from 'react';
import {BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import LoginPage from './loginPage/loginPage';
import MainPage from './MainPage/MainPage';
class App extends Component{
    // Page: login, main
    state = {
        displayPage: 'LoginPage',
        email: String,
        userName: String,
        userLocation: Object
    }
    mySetState = state => {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }
    
    handlePageChangeToMain = ({email, userName, userLocation}) => {
        this.setState({
            displayPage: 'MainPage',
            email: email,
            userName: userName,
            userLocation: userLocation
        })
    }
    handlePageChangeToLogin = event => {
        this.setState({displayPage: 'LoginPage'});
    }
    render(){
        const { displayPage } = this.state;
        const myState = this.state;
        let page;
        switch(displayPage){
            case 'LoginPage': page = <LoginPage onPageChange={this.handlePageChangeToMain}/>; break;
            case 'MainPage' : page = <MainPage onPageChange={this.handlePageChangeToLogin} {...myState}/>; break;
        }
        return(
            <BrowserRouter> {page} </BrowserRouter>
        )
    }
}
export default App;