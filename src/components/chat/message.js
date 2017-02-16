import React, {Component} from 'react';

class Message extends Component {
    render() {
        return (
            <div className="message collection-item">
                <div className="user"><b>{this.props.username}</b></div>
                <div className="text">
                    {
                        !this.props.text ? this.props.text : <div dangerouslySetInnerHTML={{__html: replaceSmileys(this.props.text)}}/>
                    }
                </div>
            </div>
        );
    }
}

export default Message;