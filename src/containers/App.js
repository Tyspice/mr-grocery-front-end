import React from 'react';
import HeroBanner from '../components/heroBanner';
import MobileContainer from './mobileContainer';
import DashboardContainer from './dashboardContainer';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {staples: [], oneTimeItems: []}
    }
  }

  async componentDidMount() {
    try {
      const staples = await axios.get('http://mr-grocery.herokuapp.com/api/v3/staple-items');
      const oneTimeItems = await axios.get('http://mr-grocery.herokuapp.com/api/v3/one-time-items');

      this.setState({ data: {staples: staples.data, oneTimeItems: oneTimeItems.data} });
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <HeroBanner />
        <Switch>
          <Route path="/dashboard">
            <DashboardContainer data={ this.state.data }/>
          </Route>
          <Route path="/mobile">
            <MobileContainer data={ this.state.data }/>
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
