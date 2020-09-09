import React from 'react';
import axios from 'axios';
import { Container, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Type } from 'react-bootstrap-table2-editor';
import cellEditFactory from 'react-bootstrap-table2-editor';
import _ from 'lodash';

class OneTimeItemsTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleCellEdit = this.handleCellEdit.bind(this);
    }

    async handleCellEdit(updatedItem) {
        if(updatedItem) {
            try {
                console.log(updatedItem);
                const response = await axios({
                    method: 'PATCH',
                    url: 'http://localhost:8000/api/v3/one-time-items',
                    data: updatedItem
                });
                console.log(response.data.newItem);
                this.props.handleUpdate(response.data.newItem);
            } catch (error) {
                console.log(error);
            }
        }   
    }

    render() {

        const items = this.props.data.oneTimeItems;
        const ranges = Object.keys(_.groupBy(items, 'category'));

        const categories = ranges.map(category => {
            return { value: category, label: category }
        });

        const columns = [{
            dataField: 'item',
            text: 'Item'
        }, {
            dataField: 'notes',
            text: 'Notes'
        }, {
            dataField: 'category',
            text: 'Category',
            sort: true,
            editor: {
                type: Type.SELECT,
                options: categories
            }
        }];

        const cellEdit = cellEditFactory({
            mode: 'dbclick', 
            blurToSave: true,
            afterSaveCell: (oldValue, newValue, row, column) => {
                this.handleCellEdit({
                    _id: row._id,
                    [column.dataField]: newValue
                });
            }
        });

        return (
            <Container>
                <Navbar>
                    <Form inline>
                        <FormControl type="text" placeholder="Item" className=" mr-sm-2" />
                        <FormControl type="text" placeholder="Notes" className=" mr-sm-2" />
                        <FormControl type="text" placeholder="Category" className=" mr-sm-2" />
                        <Button type="submit">Add Item</Button>
                    </Form>
                </Navbar>
                <BootstrapTable 
                keyField = '_id'
                data = { items }
                columns = { columns }
                cellEdit={ cellEdit }
                striped
                hover
                condensed
                />
            </Container>
        );
    }
}

export default OneTimeItemsTable;