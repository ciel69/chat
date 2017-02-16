const React = require('react');
const DefaultLayout = require('./layout/page');

class FrontPage extends React.Component {
    render() {
        return (
            <DefaultLayout
                user={this.props.user}
                title={this.props.title}>
                {/*<div>{this.props.name}</div>*/}
            </DefaultLayout>
        );
    }
}

module.exports = FrontPage;