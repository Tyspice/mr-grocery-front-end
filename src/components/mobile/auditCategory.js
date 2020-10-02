import React from 'react';
import { Card, Form } from 'react-bootstrap';
import AuditListItem from './auditListItem';
import { v4 as uuidv4 } from 'uuid';

const AuditCategory = (props) => {

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
                        <AuditListItem
                        handleNewStatus={ props.handleNewStatus }
                        item={ item }
                        key={ uuidv4() }
                        />
                    )
                }) 
                }
            </Card>
        </Form>
    );
}

export default AuditCategory;