import React, { Component } from 'react';
import kurentoUtils from 'kurento-utils';
import './styles.css';

class RemoteVideo extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            ws : new WebSocket('ws://18.232.60.204:8080/many2many'), 
            webRtcPeer : null,
            videoId : props.videoId,
            streamName : props.streamName
        }
    }

    //18.232.60.204
    //54.196.144.251

    componentDidMount() {
        var webSocket = this.state.ws
        var _this = this
        webSocket.onopen = function() {
            //_this.viewer()
            
            var message = {
                id : 'initialize',
                streamName : _this.state.streamName
            }
            _this.sendMessage(message)
        }
        webSocket.onmessage = function(message) {
            var parsedMessage = JSON.parse(message.data);
            console.info('Received message: ' + message.data);
        
            switch (parsedMessage.id) {
            case 'initializeResponse':
                if(parsedMessage.response === 'not ready'){
                    console.log('Initialize failed!!')
                }
                else {
                    _this.viewer()
                }
                break;
            case 'viewerResponse':
                _this.viewerResponse(parsedMessage);
                break;
            case 'stopCommunication':
                _this.dispose();
                break;
            case 'iceCandidate':
                console.log("******************************************************iceCandidate message");
                _this.state.webRtcPeer.addIceCandidate(parsedMessage.candidate)
                break;
            default:
                console.error('Unrecognized message', parsedMessage);
            }
        }

        this.setState({
            ws : webSocket
        })
    }

    presenterResponse(message) {
        if (message.response !== 'accepted') {
            var errorMsg = message.message ? message.message : 'Unknow error';
            console.warn('Call not accepted for the following reason: ' + errorMsg);
            this.dispose();
        } else {
            this.state.webRtcPeer.processAnswer(message.sdpAnswer);
        }
    }
    
    viewerResponse(message) {
        if (message.response !== 'accepted') {
            var errorMsg = message.message ? message.message : 'Unknow error';
            console.warn('Call not accepted for the following reason: ' + errorMsg);
            this.dispose();
        } else {
            this.state.webRtcPeer.processAnswer(message.sdpAnswer);
        }
    }
    
    dispose() {
        if (this.state.webRtcPeer) {
            this.state.webRtcPeer.dispose();
            this.setState({
                webRtcPeer : null
            })
        }
    	//this.hideSpinner(document.getElementById(this.state.videoId));
    }
    
    onIceCandidate(candidate, _this) {
        console.log('Local candidate' + JSON.stringify(candidate));
    
        var message = {
           id : 'onIceCandidate',
           candidate : candidate
        }
        _this.sendMessage(message)
    }
    
    onOfferViewer(error, offerSdp, _this) {
        if (error) return console.log(error)
    
        var message = {
            id : 'viewer',
            sdpOffer : offerSdp,
            streamName : _this.state.streamName
        }
        _this.sendMessage(message)
    }
    
    sendMessage(message) {
        var jsonMessage = JSON.stringify(message);
        console.log('Senging message: ' + jsonMessage);
        this.state.ws.send(jsonMessage);
    }

    viewer() {
        if (!this.state.webRtcPeer) {
            //this.showSpinner(document.getElementById(this.state.videoId));

            var options = {
                remoteVideo: document.getElementById(this.state.videoId),
                onicecandidate : (candidate) => {this.onIceCandidate(candidate, this)}
            }
            var _this = this
            
            var peer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function(error) {
                if(error) return console.log(error)
                this.generateOffer((err, offerSdp) => {_this.onOfferViewer(err, offerSdp, _this)});
            });
            this.setState({
                webRtcPeer : peer
            })
        }
    }
    
    showSpinner() {
        for (var i = 0; i < arguments.length; i++) {
            arguments[i].poster = './img/transparent-1px.png';
            arguments[i].style.background = 'center transparent url("./img/spinner.gif") no-repeat';
        }
    }
    
    hideSpinner() {
        for (var i = 0; i < arguments.length; i++) {
            arguments[i].src = '';
            arguments[i].poster = './img/webrtc.png';
            arguments[i].style.background = '';
        }
    }

    render() {
        return (
            <video id={ this.state.videoId } autoPlay width="100%" height="100%" controls></video>
        );
    }
}

export default RemoteVideo;
