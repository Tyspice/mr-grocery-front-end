import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, Accordion } from 'react-bootstrap';
import ListItem from './listItem';

const Category = (props) => {

    let data = props.data;


    return (
        <Accordion defaultActiveKey="0">
           <Card>
                <Accordion.Toggle as={Card.Header} eventKey={toString(props.index)}>{ props.category }</Accordion.Toggle>
                <Accordion.Collapse eventKey={toString(props.index)}>
                <React.Fragment>
                {
                    data.map((_object) => {
                        return(
                            <ListItem
                            key={ uuidv4() }
                            item={ _object.item }
                            inventoryStatus={ _object.inventoryStatus }
                            notes={ _object.notes }
                            />
                        )
                    })
                } 
                </React.Fragment>    
                </Accordion.Collapse>
            </Card> 
        </Accordion>
    );
}
 
export default Category;