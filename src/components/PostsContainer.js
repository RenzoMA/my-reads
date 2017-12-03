
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostDetail from './PostDetail';
import PostList from './PostList';

export default function PostsContainer() {
    return (<div className="posts-content">
        <Switch>
            <Redirect exact from="/" exact to="/all"></Redirect>
            <Route path="/:categoryName/:postId" component={PostDetail} />
            <Route path="/:categoryName" component={PostList} />
        </Switch>
    </div>)
}