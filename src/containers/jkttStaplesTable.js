import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Type } from 'react-bootstrap-table2-editor';
import cellEditFactory from 'react-bootstrap-table2-editor';
import _ from 'lodash';
import JKTTStaplesNav from './jkttStaplesNav';

class JKTTStaplesTable extends React.Component {
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
                    url: process.env.REACT_APP_API_STAPLES,
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
                    url: process.env.REACT_APP_API_STAPLES,
                    data: this.state.selected
                });
                //updates the ui
                this.props.handleDeleteUI(JSON.parse(response.config.data), true);
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
        const items = this.props.data.staples;
        const groupedItems = _.groupBy(items, 'house');
        let houseItems = groupedItems.false;

        //will only render if houseItems is defined
        if(houseItems) {
            const ranges = Object.keys(_.groupBy(houseItems, 'category'));
            const categories = ranges.map(category => {
                return { value: category, label: category }
            });

            const inventoryStatusRanges = [{
                value: 'Well Stocked', 
                label: 'Well Stocked'
            }, {
                value: 'Could Get More',
                label: 'Could Get More'
            }, {
                value: 'Low',
                label: 'Low'
            }, {
                value: 'Out',
                label: 'Out'
            }];

            const columns = [{
                dataField: 'item',
                text: 'Item',
                sort: true
            }, {
                dataField: 'inventoryStatus',
                text: 'Inventory Status',
                sort: true,
                editor: {
                    type: Type.SELECT,
                    options: inventoryStatusRanges
                }
            }, {
                dataField: 'updated',
                text: 'Last Updated',
                sort: true,
                editable: false
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
                    <JKTTStaplesNav 
                    handleDeleteSelected={ this.handleDeleteSelected }
                    handleAddItemUI={ this.props.handleAddItemUI }
                    />
                    <BootstrapTable 
                    keyField='_id'
                    data={ houseItems }
                    columns={ columns }
                    selectRow={ selectRow }
                    cellEdit={ cellEdit }
                    striped
                    hover
                    condensed
                    />
                </Container>
            );

        } else {
            return (
                <Container>
                    <JKTTStaplesNav 
                    handleDeleteSelected={ this.handleDeleteSelected }
                    handleAddItemUI={ this.props.handleAddItemUI }
                    />
                </Container>
            );
        }
    }
}

export default JKTTStaplesTable;