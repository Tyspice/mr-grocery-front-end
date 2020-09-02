import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ListGroup } from 'react-bootstrap';

const ListItem = (props) => {
    let itemColor;
    switch (props.inventoryStatus) {
        case 'Well Stocked':
            itemColor = 'success'
            break;
        case 'Could Get More':
            itemColor = 'warning'
            break;
        default:
            itemColor = 'danger'
            break;
    }

    
    
    return (
        <ListGroup horizontal>
            <ListGroup.Item key={ uuidv4() } style={ {flexBasis: "50%"} } variant={ itemColor }>{ props.item }</ListGroup.Item>
            <ListGroup.Item key={ uuidv4() } style={ {flexBasis: "50%"} }variant="info">{ `Notes: ${props.notes}` }</ListGroup.Item>      
        </ListGroup> 
    );
}
 
export default ListItem;