import React, { Component } from 'react';
import ComponentList from '../subComponents/component_list.js'
import CategoryOptionBlock from '../subComponents/CategoryOptionBlock.js'
import { Grid } from 'semantic-ui-react'


class MainList extends Component{


    render(){

        const { postList, categoryList, updateCurrentlySeletedCategory, getCurrentlySeletedCategory } = this.props;

        return(
            <div>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <ComponentList postList={postList} title={"All Posts"}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={8}>
                            <CategoryOptionBlock categoryList={categoryList}
                                                 updateCurrentlySeletedCategory={updateCurrentlySeletedCategory}
                                                 getCurrentlySeletedCategory={getCurrentlySeletedCategory} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        )
    }
}


export default MainList