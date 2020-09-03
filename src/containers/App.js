import React from 'react';
import HeroBanner from '../components/heroBanner';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavContainer from './navContainer';
import ItemsContainer from './itemsContainer';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  async componentDidMount() {
    try {
      const staples = await axios.get('http://mr-grocery.herokuapp.com/api/v3/staple-items');
      const oneTimeItems = await axios.get('http://mr-grocery.herokuapp.com/api/v3/one-time-items');
      const data = [...staples.data, ...oneTimeItems.data];

      this.setState({ data });
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <HeroBanner />
        <Container fluid="sm">
          <NavContainer />
          <ItemsContainer data={ this.state.data }/>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
