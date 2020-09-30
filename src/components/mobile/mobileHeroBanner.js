import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import groceryMan from '../../img/mr-grocery.png';

const MobileHeroBanner = (props) => {

    const styles = {
        marginTop: '20px',
        height: '150px',
        backgroundImage: `url(${groceryMan})`,
        backgroundSize: 'contain',
        backgroundColor: 'white',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

    };

    return (
    <Jumbotron 
    style={ styles } 
    />
    );
}

export default MobileHeroBanner;