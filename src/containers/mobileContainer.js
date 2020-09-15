import React from 'react';
import Category from '../components/mobile/category';
import { Container, Button } from 'react-bootstrap';
import groupBy from 'lodash/groupBy';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import axios from 'axios';


class MobileContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checkedStaples: [],
            checkedOneTimeItems: []
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(item) {
        this.props.handleClickUI(item);

        if(item.staple) {

            if (item.checked) {
                this.setState({ checkedStaples: [...this.state.checkedStaples, {_id: item._id, inventoryStatus: 'Well Stocked'}] });
            } else {
                let checkedStaples = this.state.checkedStaples;
                const index = _.findIndex(checkedStaples, e => {
                    return e._id === item._id
                });
                checkedStaples.splice(index, 1);
                this.setState({ checkedStaples })
                
            }

        } else {

            if (item.checked) {
                this.setState({ checkedOneTimeItems: [...this.state.checkedOneTimeItems, item._id] });
            } else {
                let checkedOneTimeItems = this.state.checkedOneTimeItems;
                const index = checkedOneTimeItems.indexOf(item._id);
                if (index > -1) {
                    checkedOneTimeItems.splice(index, 1);
                    this.setState({ checkedOneTimeItems })
                };
                
            }
        }
    }

    async handleSubmit() {

        const toDelete = this.state.checkedOneTimeItems;
        const toUpdate = this.state.checkedStaples;
        let response;

        if (toDelete.length > 0) {
            try {
                //updates the database
                response = await axios({
                    method: 'DELETE',
                    url: process.env.REACT_APP_API_ONETIMEITEMS,
                    data: toDelete
                });
                //updates the ui
                this.props.handleDeleteUI(JSON.parse(response.config.data), false);
                //reset component state
                this.setState({checkedOneTimeItems: []});
    
            } catch (error) {
                console.log(error);
            }
        }

        if (toUpdate.length > 0) {
            try {
                //updates the database
                response = await axios({
                    method: 'PATCH',
                    url: process.env.REACT_APP_API_BULKSTATUSUPDATE,
                    data: toUpdate

                });
                //updates ui
                this.props.handleBulkStatusUpdateUI(JSON.parse(response.config.data));

                this.setState({checkedStaples: []})

            } catch (error) {
                console.log(error)
            }
        }
    }

    

    render() {
        const allData = [...this.props.data.staples, ...this.props.data.oneTimeItems]

        const categorizedData = groupBy(allData, 'category');
        const categories = Object.keys(categorizedData);
       
        return (
            <Container fluid="sm" >
                <Button onClick={ this.handleSubmit } variant="info">Update List</Button>
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