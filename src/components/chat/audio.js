import React from 'react';

const Audio = React.createClass({
    render: function () {
        return (
            <audio id="chatAudio">
                <source src="notify/notify.ogg" type="audio/ogg"/>
                <source src="notify/notify.mp3" type="audio/mpeg"/>
                <source src="notify/notify.wav" type="audio/wav"/>
            </audio>
        );
    }
});

export default Audio;