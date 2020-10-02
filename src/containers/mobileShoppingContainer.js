import React from 'react';
import ShoppingCategory from '../components/mobile/shoppingCategory';
import { Container, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import axios from 'axios';


class MobileShoppingContainer extends React.Component {

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
        /**
         * the following code filters out well stocked items
         * so that only items needed at the store will show up
         * in the shopping version of the mobile app
         */

        //sets up variables as empty arrays so they're still iterable before load.
        let data = this.props.data.staples;
        let out = [];
        let low = [];
        let couldGetMore = [];
        //groups by inventory status and puts only desired statuses into an array.
        data = _.groupBy(data, 'inventoryStatus');
        if(data['Out']) out = data['Out'];
        if(data['Low']) low = data['Low'];
        if(data['Could Get More']) couldGetMore = data['Could Get More'];
        data = [...out, ...low, ...couldGetMore, ...this.props.data.oneTimeItems];
        //creates new object keyed out by category and an array of those categories.
        const categorizedData = _.groupBy(data, 'category');
        const categories = Object.keys(categorizedData);

        const styles = {
            updateButton: {
                margin: "0px 0px 10px 0px"
            }
        };

        return (
            <Container fluid="sm" >
                <Button 
                style={ styles.updateButton } 
                onClick={ this.handleSubmit } 
                variant="success"
                >
                    Update List
                </Button>
                {
                    categories.map(category => {
                        return (
                        <ShoppingCategory 
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

export default MobileShoppingContainer;