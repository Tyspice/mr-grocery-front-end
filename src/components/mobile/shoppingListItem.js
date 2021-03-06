import React from 'react';
import { Container } from 'react-bootstrap';
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from 'react-icons/io'

class ShoppingListItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick(this.props.item);
    }

    render() {
        const checked = this.props.item.checked
        let checkbox;

        checked ? checkbox = <IoIosRadioButtonOn /> : checkbox = <IoIosRadioButtonOff />; 

        const background = (item) => {
            let itemColor;
            switch (item.inventoryStatus) {
                case 'Out':
                    itemColor = '#d9534f'
                    break;
                case 'Low':
                    itemColor = '#f0ad4e'
                    break;
                case 'Could Get More':
                    itemColor = '#5bc0de'
                    break;
                default:
                    itemColor = '#d9534f'
                    break;
            }
            return itemColor;
        }

        const styles = {
            container: {
                display: "inline-flex", 
                alignItems: "center",
                margin: "0px 0px 5px 0px",
                backgroundColor: 'white'
            },
            itemNotesContainer: {
                padding: "10px 5px"
            },
            itemContainer: {
                display: 'flex',
                alignItems: 'center'
            },
            notes: {
                fontSize: "75%",
                color: "#485460"
            },
            indicator: {
                backgroundColor: background(this.props.item),
                height: '10px',
                width: '10px',
                borderRadius: '50%',
                margin: '10px'
            }
        }
        
        return(
        <Container onClick={ this.handleClick } style={ styles.container }>
            { checkbox }
            <div style={ styles.itemNotesContainer }>
                <div style={ styles.itemContainer }>
                    <div>{ this.props.item.item }</div>
                    <div style={ styles.indicator } />
                </div>
                <div style={ styles.notes }>{ this.props.item.notes }</div>
            </div>
        </Container>
        );
    }

}

export default ShoppingListItem;