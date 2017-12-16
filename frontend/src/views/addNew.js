import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { Button, List, Segment, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

class AddNew extends Component{

    render(){

        return(
            <div>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <Link to="/">
                                <Button icon floated='right'>
                                    <Icon name='arrow left' />
                                </Button>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Segment padded='very'>

                                <Header textAlign='center' size='medium' color='blue'>Add New</Header>


                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        )
    }
}


export default AddNew