import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { Button, List, Segment, Header, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'
import { deletePost, postNewComment } from '../APIs/BlogpostAPI';
import { postAction, commentAction } from '../actions';

class PostDetail extends Component{

    state = {
        home_redirect: false,
        addCommentMode: false,
        validation: false,
        commentFields_author: '',
        commentFields_comment: ''
    };

    validator = () => {
        const { commentFields_author, commentFields_comment } = this.state;

        if(!commentFields_comment || commentFields_comment.trim() === "")
            return false;
        if(!commentFields_author || commentFields_author.trim() === "")
            return false;
        return true;

    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });


    commentSubmit = () => {

        if(this.validator()){
            const { commentFields_author, commentFields_comment } = this.state;
            const { blog, addComments, allComments } = this.props;

            let commentObj = {
                id: Date.now().toString(),
                timestamp: Date.now(),
                body: commentFields_comment,
                author: commentFields_author,
                parentId: blog.selectedId
            }

            console.log(commentObj);

            postNewComment(commentObj).then((res) => {

                for(var key in res){
                    if(res.hasOwnProperty(key)){
                        commentObj[key] = res[key];
                    }
                };

                allComments.push(commentObj);

                addComments({
                    activityType: 'comments',
                    content: allComments
                });

            });

        }else{
            this.setState({ validation: false });
        }
    };

    convertEpochToDate = (epoch) => {
        return new Date(epoch).toDateString();
    };

    addCommentMode = () => {
        this.setState({ addCommentMode: true });
    };

    deletePostFunction = (e) => {
        const { blog, postAction, comment, addComments } = this.props;
        let temp = [];
        comment.map(p => {
            if(p.parentId === blog.selectedId)
                p.parentDeleted = true;
            temp.push(p);
        });

        addComments({
            activityType: 'comments',
            content: temp
        });

        deletePost(blog.selectedId).then((res) => {
            let p = blog.post.filter(p => p.id !== blog.selectedId);
            postAction({
                activityType: 'post',
                content: p
            });
        });
        this.setState({ home_redirect: true });

    };

    render(){

        const { post, comment } = this.props;
        const { home_redirect, addCommentMode, validation, commentFields_comment, commentFields_author } = this.state;

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
                                <Segment padded='very' style={{paddingBottom: "60px"}}>

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

                                    <Link to="/addNew">
                                        <Button primary floated='left' style={{marginTop: "10px"}}>Update</Button>
                                    </Link>
                                    <Button  onClick={this.deletePostFunction} color='red' floated='left' style={{marginTop: "10px"}}>Delete</Button>

                                </Segment>
                            )}

                            {post[0] && (
                                <Segment padded='very' style={{paddingBottom: "60px"}}>
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
                                    <Button primary onClick={this.addCommentMode} floated='left' style={{marginTop: "10px"}}>Add Comment</Button>

                                    { addCommentMode && (
                                        <Segment>
                                            <Form onSubmit={this.commentSubmit}>
                                                <Form.Field required>
                                                    <Form.Input label='author' placeholder='author' name='commentFields_author' value={commentFields_author} onChange={this.handleChange}/>
                                                </Form.Field>
                                                <Form.Field required>
                                                    <Form.TextArea label='comment' placeholder='comment...' name='commentFields_comment' value={commentFields_comment} onChange={this.handleChange}/>
                                                </Form.Field>
                                                <Form.Button>Submit</Form.Button>

                                                {
                                                    validation && (
                                                        <p>All fields must be filled!</p>
                                                    )
                                                }

                                            </Form>
                                        </Segment>
                                    )}

                                </Segment>
                            )}

                            {!post[0] && (
                                <Segment padded='very'>
                                    <Header textAlign='center' size='medium' color='blue'>Blog Post Not Selected</Header>
                                </Segment>
                            )}

                            {home_redirect && (
                                <Redirect to="/"/>
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
        comment:(blog.selectedId) ? comment.comments.filter(c => c.parentId === blog.selectedId) : [],
        blog: blog,
        allComments: comment.comments
    }
}

function mapDispatchToProps(dispatch){
    return {
        postAction: (data) => dispatch( postAction(data) ),
        addComments: (data) => dispatch( commentAction(data) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);