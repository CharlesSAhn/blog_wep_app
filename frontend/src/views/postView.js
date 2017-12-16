import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { Button, List, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'

class PostDetail extends Component{

    convertEpochToDate = (epoch) => {
        return new Date(epoch).toDateString();
    }


    render(){

        const { post, comment } = this.props;

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

                            {post[0] && (
                                <Segment padded='very'>

                                    <Header textAlign='center' size='medium' color='blue'>{post[0].title}</Header>

                                    <List divided verticalAlign='middle'>
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    Author
                                                </List.Header>
                                                <List.Description>
                                                    {post[0].author}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    Category
                                                </List.Header>
                                                <List.Description>
                                                    {post[0].category}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    VoteScore
                                                </List.Header>
                                                <List.Description>
                                                    {post[0].voteScore}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    Date/Time
                                                </List.Header>
                                                <List.Description>
                                                    {this.convertEpochToDate(post[0].timestamp)}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    Content
                                                </List.Header>
                                                <List.Description>
                                                    {post[0].body}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                    </List>

                                </Segment>
                            )}

                            {post[0] && (
                                <Segment padded='very'>
                                <Header size='medium' color='blue'>({post[0].commentCount}) Comments:</Header>

                                <Segment>
                                <List divided verticalAlign='middle'>
                                {
                                    comment.map( c =>
                                        <List.Item key={c.id}>
                                            <List.Content>
                                                <List.Header>
                                                    author: {c.author}, voteScore: {c.voteScore}
                                                </List.Header>
                                                <List.Description>
                                                    {c.body}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                    )
                                }
                                </List>
                                </Segment>
                                </Segment>
                            )}

                            {!post[0] && (
                                <Segment padded='very'>
                                    <Header textAlign='center' size='medium' color='blue'>Blog Post Not Selected</Header>
                                </Segment>
                            )}

                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        )
    }
}



function mapStateToProps({blog, comment}){
    return{
        post: (blog.selectedId) ? blog.post.filter(p => p.id === blog.selectedId) : [],
        comment:comment.comments
    }
}

function mapDispatchToProps(dispatch){
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);