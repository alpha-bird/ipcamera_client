import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import kurentoUtils from 'kurento-utils';

var ws = new WebSocket('wss://18.232.60.204:8080/one2many')
var webRtcPeer

ws.onmessage = function(message) {
	var parsedMessage = JSON.parse(message.data);
	console.info('Received message: ' + message.data);

	switch (parsedMessage.id) {
	case 'presenterResponse':
		presenterResponse(parsedMessage);
		break;
	case 'viewerResponse':
		viewerResponse(parsedMessage);
		break;
	case 'stopCommunication':
		dispose();
		break;
	case 'iceCandidate':
		console.log("******************************************************iceCandidate message");
		webRtcPeer.addIceCandidate(parsedMessage.candidate)
		break;
	default:
		console.error('Unrecognized message', parsedMessage);
	}
}
function presenterResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		console.warn('Call not accepted for the following reason: ' + errorMsg);
		dispose();
	} else {
		webRtcPeer.processAnswer(message.sdpAnswer);
	}
}

function viewerResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		console.warn('Call not accepted for the following reason: ' + errorMsg);
		dispose();
	} else {
		webRtcPeer.processAnswer(message.sdpAnswer);
	}
}

function dispose() {
	if (webRtcPeer) {
		webRtcPeer.dispose();
		webRtcPeer = null;
	}
//	hideSpinner(video);
}

function onIceCandidate(candidate) {
    console.log('Local candidate' + JSON.stringify(candidate));

    var message = {
       id : 'onIceCandidate',
       candidate : candidate
    }
    sendMessage(message);
}

function onOfferViewer(error, offerSdp) {
    if (error) return console.log(error)

    var message = {
        id : 'viewer',
        sdpOffer : offerSdp
    }
    sendMessage(message);
}

function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log('Senging message: ' + jsonMessage);
    ws.send(jsonMessage);
}

class App extends Component {
    componentDidMount() {
        var _this = this
        ws.onopen = function() {
            _this.viewer()
        }
    }
    viewer() {
        if (!webRtcPeer) {
            //showSpinner(video);

            var options = {
                remoteVideo: document.getElementById('video'),
                onicecandidate : onIceCandidate
            }
            
            webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function(error) {
                if(error) return console.log(error)
    
                this.generateOffer(onOfferViewer);
            });
        }
    }
    

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <video id="video" autoPlay width="640px" height="480px" poster="img/webrtc.png"></video>
                <button onClick = {this.viewer}>Start View</button>
            </div>
        );
    }
}

export default App;
