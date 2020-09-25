import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const DashboardNav = (props) => {
    return (
        <Nav variant="tabs" fill>
            <Nav.Item>
                <LinkContainer to="/dashboard/house-staples">
                    <Nav.Link>House Staples</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/dashboard/jktt-staples">
                    <Nav.Link>JKTT Staples</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/dashboard/one-time-items">
                    <Nav.Link>One Time Items</Nav.Link>
                </LinkContainer>
            </Nav.Item>
        </Nav>
    );
}

export default DashboardNav;