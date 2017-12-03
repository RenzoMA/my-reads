import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import * as actions from './../actions';

export class CommentCreate extends Component {
    state = {
        comment: {
            body: ''
        }
    }
    commentHandler = (event, value) => {
        this.setState({ comment: { ...this.state.comment, body: value } });
    }

    addComment = () => {
        const { body } = this.state.comment;
        if (body) {
            const { id } = this.props.post.detail;
            this.props.addComment(id, this.state.comment)
                .then(() => {
                    this.setState({ comment: { ...this.state.comment, body: '' } });
                    this.props.onCommentAdded();
                });
        }
    }

    render() {
        return (<div className="add-comment-container">
            <TextField
                onChange={this.commentHandler}
                hintText="Add comment"
                multiLine={true}
                style={{ width: "70%" }}
                value={this.state.comment.body}
                rows={1} />
            <FlatButton label="Add" primary={true} onClick={this.addComment} />
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        post: state.post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addComment: (postId, comment) => dispatch(actions.addComment(postId, comment))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCreate);