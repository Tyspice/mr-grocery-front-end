import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Category from '../components/category';

class ItemsContainer extends React.Component {
    render() {
        
        const data = this.props.data;
        const ranges = Object.keys(data);
        return (
            <React.Fragment>
                {
                    ranges.map((_category) => {
                        return(
                            <Category
                            key={ uuidv4() }
                            category={ _category }
                            data={ data[_category] }
                            />

                        )
                    })
                }
            </React.Fragment>
        );
    }
}

export default ItemsContainer;