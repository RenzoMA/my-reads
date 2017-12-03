
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostDetail from './PostDetail';
import PostList from './PostList';

export default function PostsContainer() {
    return (<div className="posts-content">
        <Switch>
            <Redirect exact from="/" exact to="/category/all"></Redirect>
            <Route path="/category/:categoryName" component={PostList} />
            <Route path="/post/:postId" component={PostDetail} />
        </Switch>
    </div>)
}