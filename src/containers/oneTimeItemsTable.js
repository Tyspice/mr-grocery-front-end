import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import AddOneTimeItemsForm from './addOneTimeItemsForm';
import { Type } from 'react-bootstrap-table2-editor';
import cellEditFactory from 'react-bootstrap-table2-editor';
import _ from 'lodash';

class OneTimeItemsTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleCellEdit = this.handleCellEdit.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
    }

    async handleCellEdit(updatedItem) {
        if(updatedItem) {
            try {
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

    handleAddItem() {
        //will handle add item
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

        const selectRow = {
            mode: 'checkbox',
            bgColor: 'tomato',
        };

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
                <AddOneTimeItemsForm 
                handleAddItem={ this.props.handleAddItem }
                />
                <BootstrapTable 
                keyField='_id'
                data={ items }
                columns={ columns }
                selectRow={ selectRow }
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