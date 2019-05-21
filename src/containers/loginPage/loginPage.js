import React, { Component } from 'react';
import './assets/css/logInPage.module.css';
import { getCurrentPosition, mySetTimeout } from './../../models/utils'

class loginPage extends Component{
    state = {
        message: '',
    }
    getUsrLocation = async () => {
        try{
            this.setState({message: 'Waiting for the browser to get your current location...... It takes a couple seconds! '});
            const { coords } = await getCurrentPosition();
            const { latitude, longitude } = coords;
            return ({
                address: '',
                lat: latitude,
                lng: longitude
            })        } 
        catch(err){
            console.log('Cannot get user\'s current location');
            console.log(err);
        }
    }
    saveUserProfile = async () => {
        // const loc = await getCurrentPosition();
        const loc = await this.getUsrLocation();
        const userDB = {
            email: document.getElementById('usrEmail').value.trim(),
            userName: document.getElementById('usrName').value.trim(),
            userLocation: loc
        }
        const option = {
            method: 'POST',
            body: JSON.stringify(userDB),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await fetch('/login', option);
            const resJSON = await res.json();

            // Handle frontend component
            this.setState({message: resJSON.message});
            if(resJSON.state == 'success'){
                document.getElementById('usrEmail').value = '';
                document.getElementById('usrName').value = '';
                await mySetTimeout(1000);
                this.props.onPageChange(userDB);
            }
        }
        catch(err){
            console.log('Cannot save user info to DB');
            console.log(err);
        }
        console.log('Save user information to DB'); 
    }

    render(){
        return(
            <div className="page_logIn">
            {/* Header */}
                <header>
                    <h1 className="page_logIn">Let's Get Things Done!</h1>
                    <p  className="page_logIn"> A TodoList app with Google map, which enables users to organize<br />
                    daily tasks. Created by Ting-Chun(Mike) Wang.</p>
                </header>

            {/* Signup Form */}
                <form className="page_logIn" id="signup-form" action="javascript:void(0)" onSubmit={this.saveUserProfile}>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <div>
                            <input className="page_logIn" type="text"  id="usrName"  placeholder="User Name" required/>
                            <input className="page_logIn" type="email" id="usrEmail" placeholder="Email Address" required/>
                        </div>
                        <button className="page_logIn" type="submit"> Sign In / Up </button>
                    </div>
                </form>
                <p> {this.state.message} </p>
            </div>
        )
    }
}

export default loginPage;