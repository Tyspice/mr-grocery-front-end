import React from 'react';
import DashboardNav from '../components/dashboard/dashboardNav';
import OneTimeItemsTable from './oneTimeItemsTable';
import HouseStaplesTable from './houseStaplesTable';
import JKTTStaplesTable from './jkttStaplesTable';
import { Switch, Route, Redirect } from 'react-router-dom';

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
                        handleUpdateUI={ this.props.handleUpdateUI }
                        handleAddItemUI={ this.props.handleAddItemUI }
                        handleDeleteUI={ this.props.handleDeleteUI }
                        />
                    </Route>
                    <Route path='/dashboard/jktt-staples'>
                        <JKTTStaplesTable 
                        data={ data } 
                        handleUpdateUI={ this.props.handleUpdateUI }
                        handleAddItemUI={ this.props.handleAddItemUI }
                        handleDeleteUI={ this.props.handleDeleteUI } 
                        />
                    </Route>
                    <Route path='/dashboard/one-time-items'>
                        <OneTimeItemsTable 
                        data={ data } 
                        handleUpdateUI={ this.props.handleUpdateUI }
                        handleAddItemUI={ this.props.handleAddItemUI }
                        handleDeleteUI={ this.props.handleDeleteUI } 
                        />
                    </Route>
                    <Redirect from='/dashboard' to='/dashboard/house-staples' />
                 </Switch>
            </React.Fragment>
        );
    }
}

export default DashboardContainer;