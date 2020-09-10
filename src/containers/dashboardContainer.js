import React from 'react';
import DashboardNav from '../components/dashboard/dashboardNav';
import OneTimeItemsTable from './oneTimeItemsTable';
import HouseStaplesTable from './houseStaplesTable';
import JKTTStaplesTable from './jkttStaplesTable';
import { Switch, Route } from 'react-router-dom';

class DashboardContainer extends React.Component {
    render() {
        const data = this.props.data
        return(
            <React.Fragment>
                <DashboardNav />
                <Switch>
                    <Route path='/dashboard/house-staples'>
                        <HouseStaplesTable 
                        data={ data } 
                        handleUpdate={ this.props.handleUpdate }
                        handleAddItem={ this.props.handleAddItem }
                        />
                    </Route>
                    <Route path='/dashboard/jktt-staples'>
                        <JKTTStaplesTable 
                        data={ data } 
                        handleUpdate={ this.props.handleUpdate }
                        handleAddItem={ this.props.handleAddItem } 
                        />
                    </Route>
                    <Route path='/dashboard/one-time-items'>
                        <OneTimeItemsTable 
                        data={ data } 
                        handleUpdate={ this.props.handleUpdate }
                        handleAddItem={ this.props.handleAddItem } 
                        />
                    </Route>
                </Switch>
            </React.Fragment>
        );
    }
}

export default DashboardContainer;