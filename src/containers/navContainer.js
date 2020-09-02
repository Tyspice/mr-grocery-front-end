import React from 'react';
import { Container, Button, ButtonGroup } from 'react-bootstrap';

class NavContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Container fluid >
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary">Fetch Them Groceries</Button>
                </ButtonGroup>
            </Container>
        );
    }
}

export default NavContainer;