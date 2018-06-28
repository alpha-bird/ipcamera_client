import React, { Component } from 'react';
import RemoteVideo from './components/remotevideo';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Well Checked</h1>
                </header>
                <div style = {{ flexDirection : "row", display : "flex" }}>
                    <RemoteVideo videoId = "video1"/>
                    <RemoteVideo videoId = "video2"/>
                </div>
            </div>
        );
    }
}

export default App;
