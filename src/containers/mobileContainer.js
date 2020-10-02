import React from 'react';
import MobileHeroBanner from '../components/mobile/mobileHeroBanner';
import MobileShoppingContainer from './mobileShoppingContainer';
import MobileAuditContainer from './mobileAuditContainer';
import MobileNav from '../components/mobile/mobileNav';
import { Switch, Route, Redirect } from 'react-router-dom';

class MobileContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mobileSwitch: true
        }
        
        this.handleMobileSwitch = this.handleMobileSwitch.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    //Handles mobile switch button
    handleMobileSwitch() {
        this.setState({ mobileSwitch: !this.state.mobileSwitch })
    }
    //renders fredirect based on state 
    renderRedirect() {
        if (this.state.mobileSwitch === true) {
            return <Redirect to="/mobile/shopping" />
        } else {
            return <Redirect to="/mobile/audit" />
        }
    }

    render() {

        return (
            <React.Fragment>
                <MobileHeroBanner />
                <MobileNav 
                handleSwitch={ this.handleMobileSwitch }
                checkedSwitch={ this.state.mobileSwitch } 
                />
                <Switch>
                    <Route path="/mobile/shopping">
                        <MobileShoppingContainer 
                        handleClickUI={ this.props.handleShoppingClickUI }
                        handleDeleteUI={ this.props.handleDeleteUI }
                        handleBulkStatusUpdateUI={ this.props.handleBulkStatusUpdateUI } 
                        data={ this.props.data }
                        />
                    </Route>
                    <Route path="/mobile/audit">
                        <MobileAuditContainer
                        data={ this.props.data }
                        handleUpdateUI={ this.props.handleUpdateUI } 
                        />
                    </Route>
                </Switch>
                { this.renderRedirect() }
            </React.Fragment> 
        );
    }
}

export default MobileContainer;