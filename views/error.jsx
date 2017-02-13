const React = require('react');
const DefaultLayout = require('./layout/page');

class FrontPage extends React.Component {
    render() {
        return (
            <DefaultLayout
                user={this.props.user}
                title={this.props.error.message}>
                <p>Извините, произошла ошибка.</p>
                <div>{this.props.error.message}</div>
            </DefaultLayout>
        );
    }
}

module.exports = FrontPage;