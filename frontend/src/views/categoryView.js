import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Button} from 'semantic-ui-react';
import ComponentList from '../subComponents/component_list.js';
import { Icon } from 'semantic-ui-react'


class CategoryList extends Component{


    render(){

        const { getPostListCategory, getCurrentlySeletedCategory } = this.props;

        let titleDisplay = (getCurrentlySeletedCategory() === null)? 'Category Type Not Selected': `Category Type: ${getCurrentlySeletedCategory()} Posts`;

        return(
            <div>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <ComponentList postList={getPostListCategory()} title={titleDisplay}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Link to="/">
                            <Button icon floated='left'>
                                <Icon name='arrow left' />
                            </Button>
                        </Link>
                    </Grid.Row>
                </Grid>

            </div>
        )
    }
}


export default CategoryList