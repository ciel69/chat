const React = require('react');

class topNavigation extends React.Component {
    render() {
        const arLi = [
            {
                link: "/",
                click: "",
                text: "Главная"
            },
            {
                link: "/chat",
                click: "",
                text: this.props.user ? "Чат" : ""
            },
            {
                link: this.props.user ? "javascript:void(0);" : "/login",
                click: this.props.user ? "Logout" : "",
                text: this.props.user ? "Выйти" : "Войти"
            }
        ];
        const liMenu = arLi.map(function (item, index) {
            return (
                <li key={index}>
                    <a data-logout={item.click} href={item.link}>{item.text}</a>
                </li>
            );
        });
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#!" className="brand-logo">Logo</a>
                            <a href="#" data-activates="mobile-demo" className="button-collapse"><i
                                class="material-icons">menu</i></a>
                            <ul className="right hide-on-med-and-down">
                                {liMenu}
                            </ul>
                            <ul className="side-nav" id="mobile-demo">
                                {liMenu}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

module.exports = topNavigation;