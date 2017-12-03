import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';
import * as actions from './../actions'

class PostListHeader extends Component {


    handleChange = (event, index, value) => {
        const { posts } = this.props;
        this.props.updateSortBy(value);
        const copy = Object.assign([], posts);
        const sortedPost = copy.sort((currentPost, nextPost) => {
            if (currentPost[value] > nextPost[value]) return -1
            if (currentPost[value] < nextPost[value]) return 1
            return 0
        });
        this.props.sortPosts(sortedPost);
    }

    render() {
        return (<div className="content-header">
            <Subheader className="sub-title-header">Category: {this.props.categoryName}</Subheader>
            <SelectField
                placeholder='test'
                floatingLabelText="Sort by"
                value={this.props.sortBy}
                onChange={this.handleChange}>
                <MenuItem value={'timestamp'} primaryText="Date" />
                <MenuItem value={'voteScore'} primaryText="Score" />
            </SelectField>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sortPosts: (sortedPosts) => dispatch(actions.sortPosts(sortedPosts))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListHeader);