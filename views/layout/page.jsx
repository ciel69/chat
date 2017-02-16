const React = require('react');
const Menu = require('../partials/topNavigation.jsx');

class DefaultLayout extends React.Component {
    render() {
        return (
            <html>
            <head>
                <title>{this.props.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                {/*<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>*/}
                <link rel="stylesheet" href="/vendor/bower_components/materialize/dist/css/materialize.css"
                      media="screen,projection"/>
                <link rel="stylesheet" href="/css/style.css"/>

                <script src="/vendor/bower_components/jquery/dist/jquery.js"/>
                <script src="/vendor/bower_components/materialize/dist/js/materialize.js"/>
                <script src="/js/app.js"/>
            </head>
            <body>
            <Menu user={this.props.user}/>
            <div className="container">
                {this.props.children}
            </div>
            </body>
            </html>
        );
    }
}

module.exports = DefaultLayout;