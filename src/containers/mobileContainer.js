import React from 'react';
import Category from '../components/mobile/category';
import { Container, Button } from 'react-bootstrap';
import groupBy from 'lodash/groupBy';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';


class MobileContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checkedStaples: [],
            checkedOneTimeItems: []
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(item) {
        if(item.staple) {
            let checkedStaples = this.state.checkedStaples;
            const index = _.findIndex(checkedStaples, e => {
                return e._id === item._id
            });
            checkedStaples[index].checked = !item.checked;
            this.setState({ checkedStaples })
        } else {
            let checkedOneTimeItems = this.state.checkedOneTimeItems;
            const index = _.findIndex(checkedOneTimeItems, e => {
                return e._id === item._id
            });
            checkedOneTimeItems[index].checked = !item.checked;
            this.setState({ checkedOneTimeItems })
        }
        
    }

    componentDidMount() {
        const staples = this.props.data.staples;
        const oneTimeItems = this.props.data.oneTimeItems;
        const checkedStaples = staples.map(object => {
            return {...object, checked: false}
        });

        const checkedOneTimeItems = oneTimeItems.map(object => {
            return {...object, checked: false}
        });
        this.setState({ checkedStaples });
        this.setState({ checkedOneTimeItems });
    }


    componentDidUpdate(prevProps) {
        if(this.props.data !== prevProps.data) {
            const staples = this.props.data.staples;
            const oneTimeItems = this.props.data.oneTimeItems;
            const checkedStaples = staples.map(object => {
                return {...object, checked: false}
            });

            const checkedOneTimeItems = oneTimeItems.map(object => {
                return {...object, checked: false}
            });
            this.setState({ checkedStaples });
            this.setState({ checkedOneTimeItems });
        }
    }

    render() {
        const allData = [...this.state.checkedStaples, ...this.state.checkedOneTimeItems]

        const categorizedData = groupBy(allData, 'category');
        const categories = Object.keys(categorizedData);
       
        return (
            <Container fluid="sm" >
                <Button variant="info">Update List</Button>
                {
                    categories.map(category => {
                        return (
                        <Category 
                        category={ category }
                        items={ categorizedData[category] }
                        handleClick={ this.handleClick }
                        key={ uuidv4() } 
                        />
                        )
                    })
                }
            </Container>
        );
    }
}

export default MobileContainer;