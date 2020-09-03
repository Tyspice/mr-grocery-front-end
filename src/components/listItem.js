import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ListGroup } from 'react-bootstrap';

const ListItem = (props) => {
    

    return (
        <ListGroup varient="flush">
            <ListGroup.Item key={ uuidv4() }>
                { props.name }    
            </ListGroup.Item>     
        </ListGroup> 
    );
}
 
export default ListItem;