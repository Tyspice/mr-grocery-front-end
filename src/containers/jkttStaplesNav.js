import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

class JKTTStaplesNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: '',
            inventoryStatus: '',
            notes: '',
            category: '',
            house: false,
            staple: true
            }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleChange(e) {
        if (e.target.id === "item") {
            this.setState({ item: e.target.value });
        } else if (e.target.id === "status") {
            this.setState({ inventoryStatus: e.target.value });
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
                url: process.env.REACT_APP_API_STAPLES,
                data: this.state
            });
            //updates ui
            this.props.handleAddItemUI(response.data.newItem);
        } catch (error) {
            console.log(error);
        }

        this.setState({
            item: '',
            inventoryStatus: '',
            notes: '',
            category: '',
            house: false,
            staple: true
            });
    }

    render() {

        return (
            <Navbar expand="lg" className="justify-content-between">
                <Form inline onSubmit={ this.handleSubmit }>
                    <Form.Group>
                        <FormControl 
                        value={ this.state.item } 
                        onChange={ this.handleChange } 
                        id="item" 
                        type="text" 
                        placeholder="Item" 
                        className="mr-sm-2" 
                        />
                        <Form.Control
                        value={ this.state.inventoryStatus } 
                        onChange={ this.handleChange }
                        id="status"  
                        as="select"
                        placeholder="Inventory Status"
                        className="mr-sm-2"
                        >
                            <option>Well Stocked</option>
                            <option>Could Get More</option>
                            <option>Low</option>
                            <option>Out</option>
                        </Form.Control>
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
                            Add Staple
                        </Button>
                    </Form.Group>
                </Form>
                <Button 
                variant="danger"
                onClick={ this.props.handleDeleteSelected }
                >
                    Delete Selected
                </Button>
            </Navbar>
                
        );
    }
}

export default JKTTStaplesNav;