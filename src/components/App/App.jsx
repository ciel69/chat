import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Grid  from 'react-bootstrap/lib/Grid';
import {Login, Logout} from '../../components/Login';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem  from 'react-bootstrap/lib/NavItem';
import {Link} from 'react-router';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { loginUser, logoutUser } from '../../redux/actions/authActions';

import './bootstrap.css';

class App extends Component {
    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props;
        return (
            <div>
                <div>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to='/'>Hello World</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav navbar>
                                {isAuthenticated &&
                                <LinkContainer to='/time'>
                                    <NavItem>Время</NavItem>
                                </LinkContainer>
                                }
                                {isAuthenticated &&
                                <LinkContainer to='/chat'>
                                    <NavItem>Чат</NavItem>
                                </LinkContainer>
                                }
                                <LinkContainer to='/counters'>
                                    <NavItem>Счетчики</NavItem>
                                </LinkContainer>
                                {!isAuthenticated &&
                                <LinkContainer to='/login'>
                                    <NavItem>Войти</NavItem>
                                </LinkContainer>
                                }
                                {isAuthenticated &&
                                <Logout onLogoutClick={() => dispatch(logoutUser())} />
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <Grid>
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    children: PropTypes.node
};

function mapStateToProps(state) {
    const { auth } = state;
    const { isAuthenticated, errorMessage } = auth;
    return {
        isAuthenticated,
        errorMessage
    };
}

export default connect(mapStateToProps)(App);
