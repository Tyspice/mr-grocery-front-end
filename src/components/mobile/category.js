import React from 'react';
import { Card, Form } from 'react-bootstrap';
// import ListItem from './listItem';
import ListItem from './listItem';
import { v4 as uuidv4 } from 'uuid';

const Category = (props) => {

    const items = props.items;

    return (
        <Form>
            <Card>
                <Card.Header>{ props.category }</Card.Header>
                {
                items.map(item => {
                    return(
                        <ListItem
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

export default Category;