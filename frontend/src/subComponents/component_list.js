import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, List, Segment, Header } from 'semantic-ui-react'

class ComponentList extends Component{


    keyGen = (ic) => {
        return `${ic}`
    }

    
    render(){

        const { postList, title } = this.props;

        return(

            <Segment padded='very'>
                <Header textAlign='center' size='medium' color='blue'>{title}</Header>
                <List divided verticalAlign='middle'>

                    {
                        postList.map(post =>
                            <List.Item key={post.id}>
                                <List.Content floated='right'>
                                    <Link to="/postDetail">
                                        <Button>Detail</Button>
                                    </Link>
                                </List.Content>
                                <List.Content>
                                    Timestamp: {post.timestamp}
                                </List.Content>
                                <List.Content>
                                    Title: {post.title}
                                </List.Content>
                                <List.Content>
                                    Category: {post.category}
                                </List.Content>
                                <List.Content>
                                    Vote Score: {post.voteScore}
                                </List.Content>
                            </List.Item>

                        )
                    }

                </List>
            </Segment>



        )
    }
}

export default ComponentList