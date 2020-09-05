import React from 'react';
import TestTable from '../components/dashboard/bootstrapTableTest';

class DashboardContainer extends React.Component {
    render() {
        return(
            <TestTable data={ this.props.data }/>
        );
    }
}

export default DashboardContainer;