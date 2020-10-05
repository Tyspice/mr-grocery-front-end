import React from 'react';
import AuditCategory from '../components/mobile/auditCategory';
import MobileOneTimeItemsNav from './mobileOneTimeItemsNav';
import { Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import axios from 'axios';


class MobileAuditContainer extends React.Component {

    constructor(props) {
        super(props);

        this.handleNewStatus = this.handleNewStatus.bind(this);
    }

    async handleNewStatus(updatedItem) {
        if(updatedItem) {
            try {
                //updates the database
                const response = await axios({
                    method: 'PATCH',
                    url: process.env.REACT_APP_API_STAPLES,
                    data: updatedItem
                });
                //updates the ui
                this.props.handleUpdateUI(response.data.newItem);
            } catch (error) {
                console.log(error);
            }
        } 
    }

    render() {

        const data = this.props.data.staples;
        const categorizedData = _.groupBy(data, 'category');
        const categories = Object.keys(categorizedData);

        return (
            <Container fluid="sm" >
                <MobileOneTimeItemsNav
                handleAddItemUI={ this.props.handleAddItemUI }
                 />
                {
                    categories.map(category => {
                        return (
                        <AuditCategory 
                        category={ category }
                        items={ categorizedData[category] }
                        handleNewStatus={ this.handleNewStatus }
                        key={ uuidv4() } 
                        />
                        )
                    })
                }
            </Container>
        );
    }
}

export default MobileAuditContainer;