import React from 'react';
import TestTable from './bootstrapTableTest';

class DashboardContainer extends React.Component {
    render() {
        const data = this.props.data
        return(
            <TestTable data={ data } handleUpdate={ this.props.handleUpdate } />
        );
    }
}

export default DashboardContainer;