import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import CategoryList from './views/categoryView.js';
import AddNew from './views/addNew.js';
import PostDetail from './views/postView.js';
import MainList from './views/rootView.js';
import * as BlogPostAPI from './APIs/BlogpostAPI';
import TopBar from './views/topMenuBar';
import { postAction, categoryAction } from './actions'
import { connect } from 'react-redux'


class App extends Component {

    componentDidMount(){

        const { addPost, defineCategory } = this.props;

        BlogPostAPI.getAllPosts().then((posts) => {

            addPost({
                activityType: 'post',
                content: posts
            });


        })

        BlogPostAPI.getCategories().then((categories) => {
            categories.categories.map(cat => cat.text = cat.name);
            categories.categories.map(cat => cat.value = cat.name);
            defineCategory({
                activityType:'categoryTypes',
                content:  categories.categories
            })

        })
    };

    render() {

    return (
        <div className="App">

            <header>
                <TopBar/>
            </header>

            <div id="content-wrapper" className="mui--text-center">
                <Route exact path="/" render={() => (
                    <MainList />
                )}/>
                <Route exact path="/addNew/addNew/addNew"  render={() => (
                    <AddNew />
                )}/>

                <Route exact path="/:category" render={() => (
                    <CategoryList />
                )}/>

                <Route exact path="/:category/:post_id" render={() => (
                    <PostDetail />
                )}/>

            </div>

        </div>


    );
    }
}

function mapStateToProps({blog,category}){
    return{
        blog: blog,
        category: category
    }
}

function mapDispatchToProps(dispatch){
    return {
        addPost: (data) => dispatch( postAction(data) ),
        defineCategory: (data) => dispatch( categoryAction(data) ),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
