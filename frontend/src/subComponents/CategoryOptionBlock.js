import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Header, Button, Dropdown } from 'semantic-ui-react'

class CategoryOptionBlock extends Component{




    render(){

        const { categoryList, updateCurrentlySeletedCategory, getCurrentlySeletedCategory } = this.props;

        return(
            <Segment padded='very' style={{paddingBottom: "60px"}} disabled={getCurrentlySeletedCategory() === null}>
                <Header textAlign='center' size='medium' color='teal'>Display by Category</Header>
                <Dropdown placeholder='Category' fluid search selection options={categoryList} value={getCurrentlySeletedCategory()}
                          onChange={(e, { value }) => {updateCurrentlySeletedCategory(value)}}/>

                <Link to="/category">
                    <Button primary floated='right' style={{marginTop: "10px"}}>Apply</Button>
                </Link>
            </Segment>

        )
    }
}

export default CategoryOptionBlock