import React, {Component} from 'react';

export default function getMessage() {
    $.ajax({
        type: 'POST',
        url: '/message',
        success: function(msg){
            return msg.json();
        }
    });
}