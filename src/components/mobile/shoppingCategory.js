import React from 'react';
import { Card, Form } from 'react-bootstrap';
import ShoppingListItem from './shoppingListItem';
import { v4 as uuidv4 } from 'uuid';

const ShoppingCategory = (props) => {

    const items = props.items;

    const styles = {
        cardHeader: {
            margin: "0px 0px 5px 0px"
        }
    };

    return (
        <Form>
            <Card>
                <Card.Header style={ styles.cardHeader }>{ props.category }</Card.Header>
                {
                items.map(item => {
                    return(
                        <ShoppingListItem
                        item={ item }
                        handleClick={ props.handleClick }
                        key={ uuidv4() }
                        />
                    )
                }) 
                }
            </Card>
        </Form>
    );
}

export default ShoppingCategory;