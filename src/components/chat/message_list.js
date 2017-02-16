import React, {Component} from 'react';
import Message from './message';

class MessageList extends Component {
    render() {
        return (
            <div className="message_list collection">
                {
                    this.props.messages.map((element, i) => {
                        name = !element.user_id ?"":element.user_id.username;
                        return (
                            <Message
                                key={element._id||i}
                                text={element.message}
                                username={name}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default MessageList;