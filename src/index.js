import React from 'react';
import {render} from 'react-dom';
const HelloWorld = React.createClass({
    render: function() {
        return (
            <h1>Hello from {this.props.phrase}!</h1>
        );
    }
});
render(
    <HelloWorld phrase='ES6'/>,
    document.getElementById('app')
);