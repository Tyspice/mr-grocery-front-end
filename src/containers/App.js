import React from 'react';
import HeroBanner from '../components/heroBanner';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemsContainer from './itemsContainer';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  async componentDidMount() {
    const response = await fetch('http://mr-grocery.herokuapp.com/api/v2/data', {
      method: 'GET',
    });
    let data = await response.json();
    data = JSON.parse(data);
    console.log(data);

    this.setState({data: data});
  }
  
  render() {
    return (
      <React.Fragment>
        <HeroBanner />
        <Container fluid="sm">
          <ItemsContainer data={this.state.data}/>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
