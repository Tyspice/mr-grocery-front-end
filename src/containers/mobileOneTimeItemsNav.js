import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

class MobileOneTimeItemsNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: '',
            notes: '',
            category: '',
            house: false,
            staple: false
            }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleChange(e) {
        if (e.target.id === "item") {
            this.setState({ item: e.target.value });
        } else if (e.target.id === "notes") {
            this.setState({ notes: e.target.value });
        } else if (e.target.id === "category") {
            this.setState({ category: e.target.value });
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            //updates database
            const response = await axios({
                method: 'POST',
                url: process.env.REACT_APP_API_ONETIMEITEMS,
                data: this.state
            });
            //updates ui
            this.props.handleAddItemUI(response.data.newItem);
        } catch (error) {
            console.log(error);
        }

        this.setState({
            item: '',
            notes: '',
            category: '',
            house: false,
            staple: false
            });
    }

    render() {

        return (
            <Navbar expand="xlg" className="justify-content-between">
                <Navbar.Brand>Quick Add</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Form onSubmit={ this.handleSubmit }>
                    <Form.Group>
                        <FormControl 
                        value={ this.state.item } 
                        onChange={ this.handleChange } 
                        id="item" 
                        type="text" 
                        placeholder="Item" 
                        className="mr-sm-2" 
                        />
                        <FormControl
                        value={ this.state.notes } 
                        onChange={ this.handleChange } 
                        id="notes" 
                        type="text" 
                        placeholder="Notes" 
                        className="mr-sm-2" 
                        />
                        <FormControl
                        value={ this.state.category } 
                        onChange={ this.handleChange } 
                        id="category" 
                        type="text" 
                        placeholder="Category" 
                        className="mr-sm-2" 
                        />
                        <Button 
                        type="submit"
                        >
                            Add One Time Item
                        </Button>
                    </Form.Group>
                </Form>
                </Navbar.Collapse>
            </Navbar>
                
        );
    }
}

export default MobileOneTimeItemsNav;