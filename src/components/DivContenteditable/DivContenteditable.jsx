import React from 'react';
import keyDown from 'react-keydown';
let charCode = "";

class DivContenteditable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyCode: "",
        };
        this.emitChange = this.emitChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillReceiveProps({keydown}) {
        if (keydown.event) {
            // inspect the keydown event and decide what to do
            charCode = keydown.event.which;
            return false;
        }
    }

    render() {
        const {tagName, html, ...props} = this.props;
        return (
            <div {...props}
                 ref={(e) => {
                     this.htmlEl = e
                 }}
                 onInput={this.emitChange}
                 onBlur={this.props.onBlur || this.emitChange}
                 contentEditable={!this.props.disabled}
                 dangerouslySetInnerHTML={{__html: html}}
            />
        );
    }

    shouldComponentUpdate(nextProps) {
        return (
            !this.htmlEl
            || ( nextProps.html !== this.htmlEl.innerHTML
            && nextProps.html !== this.props.html )
            || this.props.disabled !== nextProps.disabled
        );
    }

    componentDidUpdate() {
        if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
            this.htmlEl.innerHTML = this.props.html;
        }
    }

    keyPress(evt) {
        this.setState({charCode: evt.charCode});
    }

    emitChange(evt) {
        if (!this.htmlEl) return;
        var html = this.htmlEl.innerText;
        if (this.props.onChange && html !== this.lastHtml) {
            evt.target = {
                value: html,
                charCode: charCode
            };
            this.props.onChange(evt);
        }
        this.lastHtml = html;
    }
}
export default keyDown(DivContenteditable);
