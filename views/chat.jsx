const React = require('react');
const DefaultLayout = require('./layout/page');

class Chat extends React.Component {
    render() {
        return (
            <DefaultLayout
                user={this.props.user}
                title="Чат">
                <script src="vendor/bower_components/socket.io-client/dist/socket.io.js"/>
                <div className="row">
                    <div className="body_chat col s12">
                        <div id="chat">
                            <div className="preloader-wrapper big active">
                                <div className="spinner-layer spinner-blue">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>

                                <div className="spinner-layer spinner-red">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>

                                <div className="spinner-layer spinner-yellow">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>

                                <div className="spinner-layer spinner-green">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <script type="text/javascript" src="/js/smileys.js"/>
                <script src="/js/chat/index.js"/>
            </DefaultLayout>
        );
    }
}

module.exports = Chat;