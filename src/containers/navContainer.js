import React from 'react';
import { Navbar } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

class NavContainer extends React.Component {

    render() {

        return (
            <Navbar bg="light" expand="lg">
                <BootstrapSwitchButton
                checked={false}
                offstyle="success"
                onstyle="info"
                onlabel='Audit'
                offlabel='Shopping'
                width={100}
                />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" />
            </Navbar>
        );
    }
}

export default NavContainer;