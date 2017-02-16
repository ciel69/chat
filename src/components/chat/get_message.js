import React, {Component} from 'react';

function getMessage() {
    return fetch('/message').then(function (response) {
        return response.json();
    }).catch(function (error) {
        console.log('Request failed', error);
    });
}

export default getMessage;