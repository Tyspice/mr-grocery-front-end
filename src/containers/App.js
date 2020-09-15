import React from 'react';
import HeroBanner from '../components/heroBanner';
import MobileContainer from './mobileContainer';
import DashboardContainer from './dashboardContainer';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios';
import _ from 'lodash';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      staples: [], 
      oneTimeItems: []
    }

    this.handleShoppingClickUI = this.handleShoppingClickUI.bind(this);
    this.handleUpdateUI = this.handleUpdateUI.bind(this);
    this.handleAddItemUI = this.handleAddItemUI.bind(this);
    this.handleDeleteUI = this.handleDeleteUI.bind(this);
    this.handleBulkStatusUpdateUI = this.handleBulkStatusUpdateUI.bind(this);
  }

  async componentDidMount() {
    try {

      //fetches data from the api on component mount
      const staples = await axios.get(process.env.REACT_APP_API_STAPLES);
      const oneTimeItems = await axios.get(process.env.REACT_APP_API_ONETIMEITEMS);
      
      //adds a checked parameter to each object
      const checkedStaples = staples.data.map(object => {
        return {...object, checked: false}
      });
      const checkedOneTimeItems = oneTimeItems.data.map(object => {
        return {...object, checked: false}
      });

      this.setState({ staples: checkedStaples, oneTimeItems: checkedOneTimeItems });
    } catch (error) {
      console.log(error);
    }
  }

  /******************************************************************
   * All of these functions update the ui state 
   */

  handleShoppingClickUI(item) {
    if(item.staple) {
      let staples = this.state.staples;
      const index = _.findIndex(staples, e => {
          return e._id === item._id
      });
      staples[index].checked = !item.checked;
      this.setState({ staples })
    } else {
      let oneTimeItems = this.state.oneTimeItems;
      const index = _.findIndex(oneTimeItems, e => {
          return e._id === item._id
      });
      oneTimeItems[index].checked = !item.checked;
      this.setState({ oneTimeItems })
    }
  }

  handleUpdateUI(item) {

    if(item.staple) {
      let staples = this.state.staples;
      const index = _.findIndex(staples, e => {
        return e._id === item._id
      });
      staples[index] = item;
      this.setState({staples: staples})

    } else {
      let oneTimeItems = this.state.oneTimeItems;
      const index = _.findIndex(oneTimeItems, e => {
        return e._id === item._id
      });
      oneTimeItems[index] = item;
      this.setState({oneTimeItems: oneTimeItems})
    }
  }

  handleBulkStatusUpdateUI(staplesArray) {
    let staples = this.state.staples;

    staplesArray.forEach(staple => {
      let index = _.findIndex(staples, e => {
        return staple._id === e._id;
      });
      staples[index].inventoryStatus = staple.inventoryStatus;
      staples[index].checked = false;

    });

    this.setState({staples: staples})
  }
  
  handleAddItemUI(newItem) {

    if(newItem.staple) {
      const staples = [newItem, ...this.state.staples];
      this.setState({staples: staples}); 

    } else {
      const oneTimeItems = [newItem, ...this.state.oneTimeItems];
      this.setState({oneTimeItems: oneTimeItems});
    }
  }

  handleDeleteUI(deleted, staple) {
    if(staple) {
      let staples = this.state.staples;
      let index;
      deleted.forEach(id => {
        index = staples.map((e) => { 
          return e._id; 
        }).indexOf(id);
        staples.splice(index, 1);
      });
      this.setState({ staples: staples });
      
    } else {
      let oneTimeItems = this.state.oneTimeItems;
      let index;
      deleted.forEach(id => {
        index = oneTimeItems.map((e) => { 
          return e._id; 
        }).indexOf(id);
        oneTimeItems.splice(index, 1);
      });
      this.setState({ oneTimeItems: oneTimeItems });
    }
    
  }

  
  render() {
    return (
      <React.Fragment>
        <HeroBanner />
        <Switch>
          <Route path="/dashboard">
            <DashboardContainer 
            data={ this.state } 
            handleAddItemUI={ this.handleAddItemUI } 
            handleUpdateUI={ this.handleUpdateUI }
            handleDeleteUI={ this.handleDeleteUI }
            />
          </Route>
          <Route path="/mobile">
            <MobileContainer 
            handleClickUI={ this.handleShoppingClickUI }
            handleDeleteUI={ this.handleDeleteUI }
            handleBulkStatusUpdateUI={ this.handleBulkStatusUpdateUI } 
            data={ this.state }
            />
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
