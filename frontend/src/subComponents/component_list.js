import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, List, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { LIST_TYPE_CATEGORY, LIST_TYPE_ALL, SORT_TYPE_VOTE_SCORE, SORT_TYPE_TIMESTAMP } from '../utils/ConstantTypes.js'
import { getComments } from "../APIs/BlogpostAPI";
import { postAction, commentAction } from '../actions'
import { Grid, Dropdown } from 'semantic-ui-react'

class ComponentList extends Component{

    convertEpochToDate = (epoch) => {
        return new Date(epoch).toDateString();
    }

    getPostList = (blog, listType, category) => {

        switch(listType) {
            case LIST_TYPE_CATEGORY:
                return blog.post.filter(post => post.category === category.selectedName).filter(post => post.deleted === false);
            default:
                return blog.post.filter(post => post.deleted === false);

        }
    };

    handleClick = (post, event) => {
        const { postAction } = this.props;

        postAction({
            activityType: 'selectedId',
            content: post.id
        });

        this.callCommentsAPI(post.id);
    };

    callCommentsAPI(id){
        let { addComments, existingComment } = this.props;
        //let tempComment = existingComment;
        getComments(id).then((newComments) => {

            newComments.map(c => {
                console.log(c);
                existingComment = existingComment.filter(eComment => eComment.id !== c.id)
                existingComment.push(c);
                console.log(existingComment);
            });


            // for(var key in newComments){
            //     if(newComments.hasOwnProperty(key)){
            //         if(existingComment.find( o => { o.id === newComments[key].id}) !== undefined)
            //         {
            //             tempComment = existingComment.filter(c => c.id !== newComments[key].id);
            //         };
            //         tempComment.push(newComments[key]);
            //     }
            // };

            addComments({
                activityType: 'comments',
                content: existingComment
            });
        })
    };

    sortBy = (value)=> {
        const { postAction, blog } = this.props;

        switch(value){
            case SORT_TYPE_VOTE_SCORE:
                postAction({
                    activityType: 'post',
                    content: blog.post.sort((a,b) => b.voteScore - a.voteScore)
                });
                break;
            case SORT_TYPE_TIMESTAMP:
                postAction({
                    activityType: 'post',
                    content: blog.post.sort((a,b) => b.timestamp - a.timestamp)
                });
                break;
            default:


        }
    }

    render(){

        const { blog, category, title, listType } = this.props;
        const sortyByList = [{text: SORT_TYPE_VOTE_SCORE, value:SORT_TYPE_VOTE_SCORE}, {text:SORT_TYPE_TIMESTAMP, value: SORT_TYPE_TIMESTAMP}];

        return(

            <Segment padded='very' style={{paddingBottom: "60px"}}>
                <Header textAlign='center' size='medium' color='blue'>{title}</Header>
                <List selection divided verticalAlign='middle'>

                    {
                        this.getPostList(blog, listType, category).map(post =>

                            <List.Item key={post.id} value={post.id} onClick={this.handleClick.bind(this, post)}>
                                <Link to="/postDetail">
                                    <List.Content>
                                        <List.Header>
                                            Title: {post.title}
                                        </List.Header>
                                        <List.Description>
                                            Category: {post.category},
                                            Timestamp: { this.convertEpochToDate(post.timestamp)},
                                            Vote Score: {post.voteScore}
                                        </List.Description>
                                    </List.Content>
                                </Link>

                            </List.Item>
                        )
                    }

                </List>

                <Dropdown placeholder='Sort By' fluid search selection options={sortyByList}
                          onChange={(e, { value }) => {this.sortBy(value)}}/>

                <Link to="/addNew">
                    <Button primary floated='left' style={{marginTop: "10px"}}>Add New</Button>
                </Link>

            </Segment>



        )
    }
}

function mapStateToProps({blog, category, comment}){
    return{
        blog: blog,
        category: category,
        existingComment: comment.comments
    }
}

function mapDispatchToProps(dispatch){
    return {
        postAction: (data) => dispatch( postAction(data) ),
        addComments: (data) => dispatch( commentAction(data) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentList);
