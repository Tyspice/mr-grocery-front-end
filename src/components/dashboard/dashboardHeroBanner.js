import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import groceryMan from '../../img/mr-grocery.png';

const DashboardHeroBanner = (props) => {

    const styles = {
        marginTop: '20px',
        backgroundImage: `url(${groceryMan})`,
        backgroundSize: 'contain',
        backgroundColor: 'white',
        backgroundPosition: 'center',
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
        </Jumbotron>
    );
}

export default DashboardHeroBanner;