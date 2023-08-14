import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Nav2 from "./nav2";
import Home from "./index.jsx";
import Dashboard from "./dashboard";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    
    callAPI() {
    fetch("/app.js")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }))
        .catch(err => console.error(err));

    fetch('/user')
        .then(response => response.json())
        .then(data => {
        if (data.isAuthenticated) {
        this.setState({ user: data.user });
        }
});
    }

    componentDidMount() {
    this.callAPI();
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
    if(token) {
    localStorage.setItem('userToken', token);
    }
    }
    render() {
        return (
        
           <div>
                {this.state.user ? (
                <div>
                <img src={this.state.user.avatar} alt={`${this.state.user.username}'s Avatar`} />
                <p>Welcome, {this.state.user.username}!</p>
                </div>
                ) : (
                <p>Please log in.</p>
                )}
           
        
            <Nav2 />
            <Home />
        </div>       
     );
    }

    Routering() {
        return (
            <Router>
                <div>
                    <Routes>
                    <Nav2 />
                        { localStorage.getItem('userToken') ? (
                        <Navigate to="/router/dashboard" />
                        ) : (
                        <Navigate to="/" />
                        )}
                        <Route path="/" element={<Home />} />
                        <Route path="/auth/discord" element={<Dashboard />} />
                    </Routes>
                </div>
            </Router>
        );
        }

}

export default App;