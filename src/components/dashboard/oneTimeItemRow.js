import React from 'react';

class OneTimeItemRow extends React.Component {
    render() {

        return(
            <tr>
                <td>{ this.props.item }</td>
                <td>{ this.props.notes }</td>
                <td>{ this.props.category }</td>
            </tr>
        );
    }
}

export default OneTimeItemRow;