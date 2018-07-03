import React, { Component } from 'react';
import RemoteVideo from './components/remotevideo';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            streamName : this.props.location.query.streamName ? this.props.location.query.streamName : ''
        }
    }
    render() {
        return (
            <div className="App">
                <div style = {{ flexDirection : "row", display : "flex" }}>
                    <RemoteVideo videoId = "video1" streamName={ this.state.streamName }/>
                </div>
            </div>
        );
    }
}

export default App;
