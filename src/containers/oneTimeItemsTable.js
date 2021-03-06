import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import OneTimeItemsNav from './oneTimeItemsNav';
import { Type } from 'react-bootstrap-table2-editor';
import cellEditFactory from 'react-bootstrap-table2-editor';
import _ from 'lodash';

class OneTimeItemsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: []
        };

        this.handleCellEdit = this.handleCellEdit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDeleteSelected = this.handleDeleteSelected.bind(this);
    }

    async handleCellEdit(updatedItem) {
        if(updatedItem) {
            try {
                //updates the database
                const response = await axios({
                    method: 'PATCH',
                    url: process.env.REACT_APP_API_ONETIMEITEMS,
                    data: updatedItem
                });
                //updates the ui
                this.props.handleUpdateUI(response.data.newItem);
            } catch (error) {
                console.log(error);
            }
        }   
    }

    async handleDeleteSelected() {
        const toDelete = this.state.selected;
        if (toDelete.length > 0) {
            try {
                //updates the database
                const response = await axios({
                    method: 'DELETE',
                    url: process.env.REACT_APP_API_ONETIMEITEMS,
                    data: this.state.selected
                });
                //updates the ui
                this.props.handleDeleteUI(JSON.parse(response.config.data, false));
                this.setState({selected: []});
    
            } catch (error) {
                console.log(error);
            }
        }
    }

    handleSelect(id, isSelect) {
        if (isSelect) {
            this.setState({ selected: [...this.state.selected, id] });
        } else {
            let array = this.state.selected;
            const index = array.indexOf(id);
            if (index > -1) {
                array.splice(index, 1);
                this.setState({ selected: array })
            };
            
        }
    }

    render() {

        const oneTimeItems = this.props.data.oneTimeItems;
        const allItems = [...this.props.data.oneTimeItems, ...this.props.data.staples];
        const ranges = Object.keys(_.groupBy(allItems, 'category'));

        const categories = ranges.map(category => {
            return { value: category, label: category }
        });

        const columns = [{
            dataField: 'item',
            text: 'Item',
            sort: true
        }, {
            dataField: 'notes',
            text: 'Notes',
            sort: true
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
            hideSelectColumn: true,
            clickToSelect: true,
            clickToEdit: true,
            onSelect: (row,isSelect, rowIndex, e) => {
                this.handleSelect(row._id, isSelect);
            }
            
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
                <OneTimeItemsNav 
                handleDeleteSelected={ this.handleDeleteSelected }
                handleAddItemUI={ this.props.handleAddItemUI }
                />
                <BootstrapTable 
                keyField='_id'
                data={ oneTimeItems }
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