import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { LinkContainer } from 'react-router-bootstrap';
// import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { Button, ButtonGroup } from 'react-bootstrap';

const HeroBanner = (props) => {
    return (
        <Jumbotron>
            <h1>
                Mr Grocery
            </h1>
            <p>
                Welcome to Mr Grocery
            </p>
            <ButtonGroup>
                <LinkContainer to="/dashboard/">
                    <Button variant="info">Dashboard</Button>
                </LinkContainer>
                <LinkContainer to="/mobile">
                    <Button variant="success">Mobile</Button>
                </LinkContainer>
            </ButtonGroup>
        </Jumbotron>
    );
}

export default HeroBanner;