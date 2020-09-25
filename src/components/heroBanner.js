import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { LinkContainer } from 'react-router-bootstrap';
import groceryMan from '../img/mr-grocery.png';
// import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { Button, ButtonGroup } from 'react-bootstrap';

const HeroBanner = (props) => {

    const styles = {
        backgroundImage: `url(${groceryMan})`,
        backgroundSize: 'contain',
        backgroundColor: 'white',
        backgroundPosition: '250px 0px',
        backgroundRepeat: 'no-repeat',

    };

    return (
        <Jumbotron style={ styles } >
            <h1>
                Mr Grocery
            </h1>
            <p>
                Welcome to Mr Grocery
            </p>
            <ButtonGroup>
                <LinkContainer to="/dashboard/">
                    <Button variant="outline-primary">Dashboard</Button>
                </LinkContainer>
                <LinkContainer to="/mobile">
                    <Button variant="outline-info">Mobile</Button>
                </LinkContainer>
            </ButtonGroup>
        </Jumbotron>
    );
}

export default HeroBanner;