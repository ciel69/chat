const React = require('react');
const Menu = require('../partials/topNavigation.jsx');

class DefaultLayout extends React.Component {
    render() {
        return (
            <html>
            <head>
                <title>{this.props.title}</title>
                <link rel='stylesheet' href='/css/style.css'/>
                <link rel="stylesheet" href="/vendor/bower_components/bootstrap/dist/css/bootstrap.css"/>
                <link rel="stylesheet" href="/css/style.css"/>

                <script src="/vendor/bower_components/jquery/dist/jquery.js"/>
                <script src="/vendor/bower_components/bootstrap/dist/js/bootstrap.js"/>
            </head>
            <body>
            <Menu user={this.props.user}/>
            <h1>{this.props.title}</h1>
            {this.props.children}
            </body>
            </html>
        );
    }
}

module.exports = DefaultLayout;