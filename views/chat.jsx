const React = require('react');
const DefaultLayout = require('./layout/page');

class Chat extends React.Component {
    render() {
        return (
            <DefaultLayout
                user={this.props.user}
                title="Чат">
                <script src="vendor/bower_components/socket.io-client/dist/socket.io.js"/>

                <div id="room">
                    <ul></ul>
                    <form>
                        <input className="form-control" autoComplete="off" autoFocus="" placeholder="Сообщение..."/>
                    </form>
                </div>
                <script dangerouslySetInnerHTML={{
                    __html: `
                            var socket = io.connect();
                            var form = $('#room form');
                            var ul = $('#room ul');
                            form.submit(function() {
                                var input = $(this).find('input');
                                var text = input.val();
                                input.val('');
                                socket.emit('message', text, function(data) {
                                    $('<li>', {text: text}).appendTo(ul);
                                });
                                return false;
                            });
                            socket.on('message', function(text) {
                                $('<li>', {text: text}).appendTo(ul);
                            });
                    `
                }}/>
            </DefaultLayout>
        );
    }
}

module.exports = Chat;