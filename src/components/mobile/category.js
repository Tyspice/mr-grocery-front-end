import React from 'react';
import { Card } from 'react-bootstrap';
import ListItem from './listItem';
import { v4 as uuidv4 } from 'uuid';

const Category = (props) => {

    const items = props.items;

    return (
        <Card>
            <Card.Header>{ props.category }</Card.Header>
            {
               items.map(item => {
                return(
                    <ListItem
                    item={ item }
                    key={ uuidv4() }
                    />
                )
            }) 
            }
        </Card>
    );
}

export default Category;