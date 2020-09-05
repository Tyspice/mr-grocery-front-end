import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ListGroup, Container } from 'react-bootstrap';

const ListItem = (props) => {

    const background = (item) => {
        let itemColor;
        switch (item.inventoryStatus) {
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
        return itemColor;
    }

    const styles={
        notes:{
            fontSize: "75%",
            color: "grey"
        }
    }
    

    return (
        <Container horizontal="true">
            <ListGroup variant="flush" style={{width: "100%"}}>
                <ListGroup.Item variant={ background(props.item) } key={ uuidv4() }>
                    { props.item.item }    
                </ListGroup.Item>
                <ListGroup.Item style={ styles.notes }key={ uuidv4() }>
                    { props.item.notes }
                </ListGroup.Item>     
            </ListGroup>
        </Container>
    );
}
 
export default ListItem;