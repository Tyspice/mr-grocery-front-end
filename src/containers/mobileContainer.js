import React from 'react';
import Category from '../components/mobile/category';
import { Container } from 'react-bootstrap';
import groupBy from 'lodash/groupBy';
import { v4 as uuidv4 } from 'uuid';


class MobileContainer extends React.Component {


    render() {
        const allData = [...this.props.data.staples, ...this.props.data.oneTimeItems]

        const categorizedData = groupBy(allData, 'category');
        const categories = Object.keys(categorizedData);
       
        return (
            <Container fluid="sm" >
                {
                    categories.map(category => {
                        return (
                        <Category 
                        category={ category }
                        items={ categorizedData[category] }
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