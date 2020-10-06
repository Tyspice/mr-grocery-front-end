import React from 'react';
import { Card, Form, Accordion } from 'react-bootstrap';
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
            <Accordion activeKey={ props.category }>
                <Card>
                    <Accordion.Toggle 
                    as={ Card.Header }
                    eventKey={ props.category }
                    style={ styles.cardHeader }
                    >
                        { props.category }
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={ props.category }>
                        <Card.Body>
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
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Form>
    );
}

export default ShoppingCategory;