import React, {Component} from 'react';
import {render} from 'react-dom';
import Audio from './audio';
import MessageList from './message_list';
import MessageFetch from './get_message';

const socket = io.connect('', {
    reconnect: false
});


export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [""],
            inputMessage: ""
        };
        this._connect = this._connect.bind(this);
        this._setInput = this._setInput.bind(this);
        this.doSomething = this.doSomething.bind(this);
        this._message = this._message.bind(this);
        this._leave = this._leave.bind(this);
        this._joined = this._joined.bind(this);
        this._connect = this._connect.bind(this);
        this._disconnect = this._disconnect.bind(this);
        this._logout = this._logout.bind(this);
        this._errorEvent = this._errorEvent.bind(this);
        this._sendMessage = this._sendMessage.bind(this);
        this._printMessage = this._printMessage.bind(this);
        this._printStatus = this._printStatus.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this._rendMessages = this._rendMessages.bind(this);
    }

    getMessage() {
        let _this = this;
        let promise = new Promise((resolve, reject) => {
            resolve(MessageFetch());
        });

        return (promise.then(result => {
            "use strict";
            console.log(result);
            _this._printMessage(result);
            // _this._rendMessages(result);
            $('.message_list').animate({scrollTop: +2000}, 0);
            // return result;
        }));
    }

    doSomething(e) {
        this._sendMessage();
        e.preventDefault();
    }

    componentDidMount() {
        socket.on('message', this._message);
        socket.on('leave', this._leave);
        socket.on('join', this._joined);
        socket.on('connect', this._connect);
        socket.on('disconnect', this._disconnect);
        socket.on('logout', this._logout);
        socket.on('error', this._errorEvent);
    }

    _printStatus(status) {
        this._printMessage(status);
    }

    _message(username, message) {
        // this._printMessage(username + "> " + message);
        this._printMessage([{user_id:{username: username}, message: message}]);
        $('#chatAudio')[0].play();
    }

    _leave(username) {
        // this._printStatus(username + " вышел из чата");
        var $toastContent = $('<span>' + username + '" вышел из чата"</span>');
        Materialize.toast($toastContent, 5000);
    }

    _joined(username) {
        // this._printStatus(username + " вошёл в чат");
        var $toastContent = $('<span>' + username + '" вошёл в чат"</span>');
        Materialize.toast($toastContent, 5000);
    }

    _connect() {
        // this._printMessage(test_message);
        // this._printStatus("соединение установлено");
        var $toastContent = $('<span>Соединение установлено</span>');
        Materialize.toast($toastContent, 5000);
        this.getMessage();
    }

    _disconnect() {
        // this._printStatus("соединение потеряно");
        var $toastContent = $('<span>Соединение потеряно</span>');
        Materialize.toast($toastContent, 5000);
        socket.emit('error');
    }

    _logout() {
        location.href = "/";
    }

    _errorEvent(reason) {
        if (reason == "handshake unauthorized") {
            // this._printStatus("вы вышли из сайта");
            var $toastContent = $('<span>Вы вышли из сайта</span>');
            Materialize.toast($toastContent, 5000)
        } else {
            setTimeout(function () {
                socket.connect();
            }, 500);
        }
    }

    _sendMessage() {
        const _this = this;
        const text = _this.state.inputMessage;

        socket.emit('message', text, function () {
            _this._printMessage([{user_id:{username: "я"}, message: text}]);
        });
        this.setState({inputMessage: ""});
        return false;
    }

    _printMessage(text) {
        let arrMessage = this.state.messages;
        if (text instanceof Array) {
            // arrMessage = $.extend({}, arrMessage, text);
            arrMessage = arrMessage.concat(text);
            console.log("test");
            console.log(arrMessage);
        } else {
            arrMessage.push(text);
        }
        this.setState({messages: arrMessage});
        $('.message_list').animate({scrollTop: +2000}, 0);
    }

    _setInput(e) {
        this.setState({inputMessage: e.target.value});
    }

    _rendMessages(obMessage) {
        if(!!obMessage)
        return (
            <MessageList
                messages={obMessage}
            />
        );
    }

    render() {
        return (
            <div>
                <Audio/>
                <form onSubmit={this.doSomething}>
                    <MessageList
                        messages={this.state.messages}
                    />
                    <div className="input-field col s12">
                        <input id="password" type="text"
                               onChange={this._setInput} className="validate" autoComplete="off" autoFocus=""
                               required="required"
                               value={this.state.inputMessage}/>
                        <label htmlFor="password">Сообщение</label>
                    </div>
                </form>
            </div>
        );
    }
}
render(
    <Chat/>,
    document.getElementById("chat")
);