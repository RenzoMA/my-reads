import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { PostView } from './PostView';
import Snackbar from 'material-ui/Snackbar';
import PostListHeader from './PostListHeader';
import PostCreateDialog from './PostCreateDialog';

class PostList extends Component {
    state = {
        open: false,
        snackBarOpen: false,
    };
    isComponentMounted = false;

    componentWillReceiveProps(nextProps) {
        const nextCategoryName = nextProps.match.params.categoryName;
        const { categoryName } = this.props.match.params;
        if (nextCategoryName !== categoryName) {
            this.fetchPosts(nextCategoryName);
        }
    }
    fetchPosts = (categoryName) => {
        if (categoryName === "all") {
            this.props.fetchAllPosts(this.state.sortBy)
        } else {
            this.props.fetchPosts(categoryName, this.state.sortBy)
        }
    }
    componentDidMount() {
        const { categoryName } = this.props.match.params;
        this.fetchPosts(categoryName);
        this.isComponentMounted = true;
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
    onPostCreated = () => {
        this.setState({ snackBarOpen: true });
        setTimeout(() => {
            if (this.isComponentMounted) {
                this.setState({ snackBarOpen: false })
            };
        }, 3000)
    }

    render() {
        const { posts } = this.props;
        const { categoryName } = this.props.match.params;
        return (
            <div className="post-list-container">
                <PostCreateDialog onPostCreated={this.onPostCreated} />
                <PostListHeader categoryName={categoryName} />
                <div className="cards-container">
                    {posts.length > 0 ?
                        posts.map((post) => {
                            return (<PostView key={post.id} post={post}></PostView>)
                        })
                        : <p className="no-posts">no posts to show in this category</p>
                    }
                </div>
                <Snackbar
                    open={this.state.snackBarOpen}
                    message="Post added"
                    autoHideDuration={3000}
                />
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: (category, sortBy) => dispatch(actions.fetchPosts(category, sortBy)),
        fetchAllPosts: (sortBy) => dispatch(actions.fetchAllPosts(sortBy))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);