import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CategoryList from './CategoryList';
import AppBar from 'material-ui/AppBar';
import PostsContainer from './PostsContainer';

export class Home extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="readable-container">
                    <AppBar
                        showMenuIconButton={false}
                        title="Readable" />
                    <div className="readable-content">
                        <CategoryList />
                        <PostsContainer />
                    </div>
                </div>
            </BrowserRouter>);
    };
}
