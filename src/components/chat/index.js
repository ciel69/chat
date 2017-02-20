import React, {Component} from 'react';
import {render} from 'react-dom';
import Audio from './audio';
import MessageList from './message_list';
import MessageFetch from './fetch/get_message';
import BindFunc from './bindfunction/const';
import ContentEditable from '../react-contenteditable';

const socket = io.connect('', {
    reconnect: false
});


export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [""],
            inputMessage: "",
            html: "<b>Hello <i>World</i></b>"
        };
        BindFunc(this);
    }

    getMessage() {
        let _this = this;
        let promise = new Promise((resolve, reject) => {
            resolve(MessageFetch());
        });

        return (promise.then(result => {
            _this._printMessage(result);
            $('.message_list').animate({scrollTop: +9999}, 0);
        }));
    }

    doSomething() {
        console.log("test");
        this._sendMessage();
        // e.preventDefault();
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
        this._printMessage([{user_id: {username: username}, message: message}]);
        $('#chatAudio')[0].play();
    }

    _leave(username) {
        var $toastContent = $('<span>' + username + '" вышел из чата"</span>');
        Materialize.toast($toastContent, 5000);
    }

    _joined(username) {
        var $toastContent = $('<span>' + username + '" вошёл в чат"</span>');
        Materialize.toast($toastContent, 5000);
    }

    _connect() {
        var $toastContent = $('<span>Соединение установлено</span>');
        Materialize.toast($toastContent, 5000);
        this.getMessage();
    }

    _disconnect() {
        var $toastContent = $('<span>Соединение потеряно</span>');
        Materialize.toast($toastContent, 5000);
        socket.emit('error');
    }

    _logout() {
        location.href = "/";
    }

    _errorEvent(reason) {
        if (reason == "handshake unauthorized") {
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
            _this._printMessage([{user_id: {username: "я"}, message: text}]);
        });
        this.setState({inputMessage: ""});
        return false;
    }

    _printMessage(text) {
        let arrMessage = this.state.messages;
        if (text instanceof Array) {
            arrMessage = arrMessage.concat(text);
        } else {
            arrMessage.push(text);
        }
        this.setState({messages: arrMessage});
        $('.message_list').animate({scrollTop: +9999}, 0);
    }

    _setInput(e) {
        let _this = this;
        // console.log(e.target);
        if (e.target.charCode == 13 && this.state.inputMessage != "") {
            _this.doSomething();
            return false;
        }
        this.setState({inputMessage: e.target.value});
        // this.setState({html: event.target.value});
    }

    _rendMessages(obMessage) {
        if (!!obMessage)
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
                <form id="chatForm" onSubmit={this.doSomething}>
                    <MessageList
                        messages={this.state.messages}
                    />
                    <div className="input-field col s12">
                        {/*<input id="message" type="text"
                         onChange={this._setInput} className="validate" autoComplete="off" autoFocus=""
                         required="required"
                         value={this.state.inputMessage}/>*/}
                        <ContentEditable id="message"
                                         className="validate"
                                         html={this.state.inputMessage} // innerHTML of the editable div
                                         disabled={false}       // use true to disable edition
                                         onChange={this._setInput} // handle innerHTML change
                        />
                        <label htmlFor="message">Сообщение</label>
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