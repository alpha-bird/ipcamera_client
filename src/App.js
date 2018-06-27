import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ws : new WebSocket('wss://18.232.60.204:8080/one2many'),
            webRtcPeer : null
        }
    }
    viewer() {
        /*
        if (!webRtcPeer) {
            showSpinner(video);
    
            var options = {
                remoteVideo: video,
                onicecandidate : onIceCandidate
            }
    
            webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function(error) {
                if(error) return onError(error);
    
                this.generateOffer(onOfferViewer);
            });
        }*/
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <video id="video" autoPlay width="640px" height="480px" poster="img/webrtc.png"></video>
            </div>
        );
    }
}

export default App;
