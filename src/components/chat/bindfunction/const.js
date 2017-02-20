import React, {Component} from 'react';

function BindFunc(_this) {
    _this._connect = _this._connect.bind(_this);
    _this._setInput = _this._setInput.bind(_this);
    _this.doSomething = _this.doSomething.bind(_this);
    _this._message = _this._message.bind(_this);
    _this._leave = _this._leave.bind(_this);
    _this._joined = _this._joined.bind(_this);
    _this._connect = _this._connect.bind(_this);
    _this._disconnect = _this._disconnect.bind(_this);
    _this._logout = _this._logout.bind(_this);
    _this._errorEvent = _this._errorEvent.bind(_this);
    _this._sendMessage = _this._sendMessage.bind(_this);
    _this._printMessage = _this._printMessage.bind(_this);
    _this._printStatus = _this._printStatus.bind(_this);
    _this.getMessage = _this.getMessage.bind(_this);
    _this._rendMessages = _this._rendMessages.bind(_this);
}

export default BindFunc;