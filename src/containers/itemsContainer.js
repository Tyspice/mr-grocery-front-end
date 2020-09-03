import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Category from '../components/category';
import groupBy from 'lodash/groupBy';

class ItemsContainer extends React.Component {


    render() {

        const categorizedData = groupBy(this.props.data, 'category');
        const categories = Object.keys(categorizedData);
        
       
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}

export default ItemsContainer;