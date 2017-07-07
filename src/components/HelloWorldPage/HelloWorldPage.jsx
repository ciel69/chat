import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {getMessage} from '../../redux/actions/chatActions';
import './HelloWorldPage.css';


const propTypes = {
    initialName: PropTypes.string
};

const defaultProps = {
    initialName: 'Аноним'
};

class HelloWorldPage extends Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.renderGreetingWidget = this.renderGreetingWidget.bind(this);

        this.state = {
            name: this.props.initialName,
            touched: false,
            greetingWidget: () => null
        };
    }

    handleNameChange(val) {
        const name = val.target.value;

        this.setState({touched: true});

        if (name.length === 0) {
            this.setState({name: this.props.initialName});
        } else {
            this.setState({name});
        }
    }

    renderGreetingWidget() {
        if (!this.state.touched) {
            return null;
        }

        return (
            <div>
                <hr />
                <p>Здравствуйте, {this.state.name}!</p>
            </div>
        );
    }

    render() {
        const {dispatch} = this.props;
        return (
            <div className='App'>
                <h1>Hello World!</h1>
                <div>
                    <p>Введите Ваше имя:</p>
                    <div><input onChange={this.handleNameChange}/></div>
                    {this.renderGreetingWidget()}
                    <button onClick={(event) => dispatch(getMessage(event))} className='btn btn-primary'>
                        Login
                    </button>
                </div>
            </div>
        );
    }
}

HelloWorldPage.propTypes = propTypes;
HelloWorldPage.defaultProps = defaultProps;
HelloWorldPage.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { auth } = state;
    const { isAuthenticated, errorMessage } = auth;
    return {
        isAuthenticated,
        errorMessage
    };
}

export default connect(mapStateToProps)(HelloWorldPage);
