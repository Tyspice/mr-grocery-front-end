import React from 'react';
import { Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class AuditListItem extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newStatus) {
        let item = this.props.item;
        item.inventoryStatus = newStatus

        this.props.handleNewStatus(item);
    }

    render() {

        const styles = {
            container: {
                display: "flex", 
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0px 0px 5px 0px",
                backgroundColor: 'white'
            },
            itemContainer: {
                padding: "10px 5px"
            },
        }
        
        return(
        <Container style={ styles.container }>
            <div style={ styles.itemContainer }>{ this.props.item.item }</div>  
            <ToggleButtonGroup 
            name="stock" 
            type="radio" 
            size="lg" 
            defaultValue={ this.props.item.inventoryStatus }
            onChange={ this.handleChange }
            >
                <ToggleButton value="Well Stocked" variant="outline-success"> </ToggleButton>
                <ToggleButton value="Could Get More" variant="outline-info"> </ToggleButton>
                <ToggleButton value="Low" variant="outline-warning"> </ToggleButton>
                <ToggleButton value="Out" variant="outline-danger"> </ToggleButton>
            </ToggleButtonGroup>
        </Container>
        );
    }
}

export default AuditListItem;