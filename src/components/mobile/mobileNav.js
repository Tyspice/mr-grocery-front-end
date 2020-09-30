import React from 'react';
import { Navbar } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

class MobileNav extends React.Component {

    render() {

        const styles = {
            navbar: {
                marginBottom: "25px"
            }
        };
        return (
            <Navbar
            style={ styles.navbar }
            variant="light"
            bg="secondary" 
            >
                <BootstrapSwitchButton
                width={ 110 }
                checked={ true }
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