const React = require('react');

class topNavigation extends React.Component {
    render() {
        const chat_menu = this.props.user?"<li><a href=\"/chat\">Чат</a></li>":'';
        const logout_submit = this.props.user ? '<li><a href="" onclick="$(\'<form method=POST action=/logout></form>\').appendTo(\'body\').submit();return false;">Выйти</a></li>' : '<li><a href="/login">Войти</a></li>';
        return (
            <nav className="navbar navbar-default" role="navigation">
                <ul className="nav navbar-nav">
                    <li><a href="/">Главная</a></li>
                    <li dangerouslySetInnerHTML={{__html: chat_menu}}/>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li dangerouslySetInnerHTML={{__html: logout_submit}}/>
                </ul>
            </nav>
        );
    }
}

module.exports = topNavigation;