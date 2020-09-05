import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Type } from 'react-bootstrap-table2-editor';
import cellEditFactory from 'react-bootstrap-table2-editor';

const TestTable = (props) => {

    const items = props.data.oneTimeItems;
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
            options: [{value: 'C', label: 'C'}]
        }
    }];

    return ( 
        <BootstrapTable 
        keyField = '_id'
        data = { items }
        columns = { columns }
        cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
        striped
        hover
        condensed
        />
    );
}

export default TestTable;