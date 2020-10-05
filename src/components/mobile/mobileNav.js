import React from 'react';
import { Navbar } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

class MobileNav extends React.Component {

    render() {

        const styles = {
            navbar: {
                marginBottom: "25px",
                justifyContent: "space-between"

            }
        };
        return (
            <Navbar
            style={ styles.navbar }
            variant="light"
            bg="light" 
            >
                <Navbar.Brand>Mr Grocery</Navbar.Brand>
                <BootstrapSwitchButton
                width={ 110 }
                checked={ this.props.checkedSwitch }
                onlabel="Shopping"
                offlabel="Audit"
                onstyle="success"
                offstyle="warning"
                onChange={ this.props.handleSwitch } 
                />
            </Navbar>
        );
    }
}

export default MobileNav;