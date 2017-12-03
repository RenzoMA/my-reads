import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import moment from 'moment';
import * as actions from './../actions';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Thumbup from 'material-ui/svg-icons/action/thumb-up';
import Thumbdown from 'material-ui/svg-icons/action/thumb-down';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import CommentCreate from './CommentCreate';
import CommentItem from './CommentItem'

export class PostDetail extends Component {

    state = {
        comment: {
            body: ''
        },
        editedPost: {
            body: '',
            title: ''
        },
        errors: {
            title: '',
            body: '',
        },
        deleteDialogVisible: false,
        redirect: false,
        editMode: false,
        open: false
    }

    componentDidMount() {
        const { postId } = this.props.match.params;
        this.props.fetchPost(postId).then((x) => {
            this.setState({ editedPost: { ...this.state.editedPost, body: x.body, title: x.title } })
        });
        this.props.fetchComments(postId);
    }


    upVote = () => {
        const { postId } = this.props.match.params;
        this.props.votePost('upVote', postId);
    }
    downVote = () => {
        const { postId } = this.props.match.params;
        this.props.votePost('downVote', postId);
    }
    handleDeletePost = () => {
        this.setState({ deleteDialogVisible: true });
    }
    handleDeleteClose = () => {
        this.setState({ deleteDialogVisible: false });
    }
    handleDeletePostConfirm = () => {
        const { postId } = this.props.match.params;
        this.props.deletePost(postId)
            .then(() => { this.setRedirect() })
    }
    setRedirect = () => {
        this.setState({ redirect: true });
    }
    switchToEditModeHandler = () => {
        this.setState({ editMode: true });
    }
    switchToViewModeHandler = () => {
        this.setState({ editMode: false });
    }
    handleEditPostInput = (event, index, value) => {
        this.setState({ editedPost: { ...this.state.editedPost, [event.target.name]: event.target.value } });
    }
    updatePostHandler = () => {
        if (this.validatePostUpdate()) {
            const { postId } = this.props.match.params;
            const post = this.state.editedPost;
            post.postId = postId;
            this.props.updatePost(post).then(() => {
                this.props.fetchPost(postId);
                this.setState({ editMode: false });
            })
        }
    }
    validatePostUpdate = () => {
        const { editedPost, errors } = this.state;

        errors.title = !editedPost.title ? 'title is required' : '';
        errors.body = !editedPost.body ? 'body is required' : '';

        if (errors.body || errors.title || errors.category) {
            this.setState({ errors: errors })
            return false;
        }
        else {
            this.setState({ errors: errors });
            return true;
        }
    }

    onCommentAdded = () => {
        const { postId } = this.props.match.params;
        this.props.fetchPost(postId);
        this.props.fetchComments(postId);
    }
    onCommentEdited = () => {
        const { postId } = this.props.match.params;
        this.props.fetchComments(postId);
    }

    render() {
        const style = { margin: 12 };
        const { detail, comments } = this.props.post;
        const { redirect } = this.state;
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleDeleteClose}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onClick={this.handleDeletePostConfirm}
            />,
        ];
        if (detail != null) {
            if (!detail.author) {
                return (<div className="not-found">Resource not found</div>)
            }
        }
        if (redirect) {
            return <Redirect to='/all' />;
        }
        return (<div className="card-item-detail">
            {
                detail && <Card>
                    {
                        !this.state.editMode &&
                        <CardHeader
                            avatar={`https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png`}
                            title={detail.title}
                            subtitle={`by ${detail.author} - ${moment.unix(detail.timestamp / 1000).format("DD MMM YYYY hh:mm a")}`}
                        >
                        </CardHeader>
                    }

                    <CardText>
                        {
                            !this.state.editMode ? <p>{detail.body}</p> :
                                <div>
                                    <TextField
                                        name='title'
                                        fullWidth={true}
                                        floatingLabelText="Title"
                                        value={this.state.editedPost.title}
                                        floatingLabelFixed={true}
                                        errorText={this.state.errors.title}
                                        onChange={this.handleEditPostInput}
                                    />
                                    <TextField
                                        name='body'
                                        floatingLabelText="Body"
                                        fullWidth={true}
                                        multiLine={true}
                                        floatingLabelFixed={true}
                                        value={this.state.editedPost.body}
                                        errorText={this.state.errors.body}
                                        onChange={this.handleEditPostInput}
                                        rows={2}
                                    />
                                </div>
                        }
                    </CardText>
                    <CardActions>
                        {
                            !this.state.editMode ?
                                <div className="action-buttons-container">
                                    <RaisedButton label="Edit" primary={true} style={style} onClick={this.switchToEditModeHandler} />
                                    <RaisedButton label="Delete" primary={true} style={style} onClick={this.handleDeletePost} />
                                    <div className="up-down-vote-container">
                                        <IconButton onClick={this.upVote} tooltip="Upvote">
                                            <Thumbup />
                                        </IconButton>
                                        <p>{detail.voteScore} votes</p>
                                        <IconButton onClick={this.downVote} tooltip="Downvote">
                                            <Thumbdown />
                                        </IconButton>
                                    </div>
                                </div> :
                                <div className="action-buttons-container">
                                    <RaisedButton label="Save" primary={true} style={style} onClick={this.updatePostHandler} />
                                    <RaisedButton label="Cancel" primary={true} style={style} onClick={this.switchToViewModeHandler} />
                                </div>
                        }

                    </CardActions>
                </Card>

            }
            <Dialog
                actions={actions}
                modal={true}
                open={this.state.deleteDialogVisible}>
                Are you sure to delete?
            </Dialog>
            <CommentCreate onCommentAdded={this.onCommentAdded} />
            {
                comments && detail && comments.length > 0 && <List>

                    <Subheader>Comments ({detail.commentCount})</Subheader>
                    {
                        comments.map((comment) => (
                            <CommentItem onCommentEdited={this.onCommentEdited} key={comment.id} comment={comment} />
                        ))
                    }

                </List>
            }
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
        fetchPost: (id) => dispatch(actions.fetchPost(id)),
        fetchComments: (id) => dispatch(actions.fetchComments(id)),
        addComment: (postId, comment) => dispatch(actions.addComment(postId, comment)),
        votePost: (voteOption, postId) => dispatch(actions.voteForPost(voteOption, postId)),
        deletePost: (postId) => dispatch(actions.deletePost(postId)),
        updatePost: (post) => dispatch(actions.updatePost(post))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);