import React from 'react';
import OneTimeItemRow from './oneTimeItemRow';
import { v4 as uuidv4 } from 'uuid';
import { Table } from 'react-bootstrap';

class OneTimeItemTable extends React.Component {
    render() {
        const oneTimeItems = this.props.data.oneTimeItems;

        return(
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Notes</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        oneTimeItems.map(item => {
                            return(
                                <OneTimeItemRow
                                key={ uuidv4() }
                                _id={ item._id }
                                item={ item.item }
                                notes={ item.notes }
                                category={ item.category }
                                />
                            )
                        })
                    }
                </tbody>
            </Table>
        );
    }
}

export default OneTimeItemTable;