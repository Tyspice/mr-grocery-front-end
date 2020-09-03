import React from 'react';
import { Card } from 'react-bootstrap';
import ListItem from './listItem';

const Category = (props) => {

    const items = props.items;

    return (
        <Card>
            <Card.Header>{ props.category }</Card.Header>
            {
               items.map(item => {
                return(
                    <ListItem
                    name={ item.item }
                    />
                )
            }) 
            }
        </Card>
    );
}

export default Category;