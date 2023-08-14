import React, { Component } from "react";
import Dashboard from "./dashboard.jsx"; // Added "./" to signify current directory

// Inside a React component
class dashboardAuth extends Component{
    onstructor(props) {
        super(props);
        this.state = {
        userData: {}
        };
        }
        
        componentDidMount() {
        fetch('api\app.js', {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        }
        })
        .then(res => res.json())
        .then(data => {
        this.setState({ userData: data });
        });
        }

        handleLogout() {
            localStorage.removeItem('userToken');
            window.location = '/'; // redirect to main page
            
        }

        render() {
        return (
        <div>
        {/* Display user data here */}
        <p>Welcome, {this.state.userData.username}</p>
        <button onClick={this.handleLogout}>Logout</button>
        </div>
        );
        }
        };


export default dashboardAuth;