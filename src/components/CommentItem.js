import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { grey400 } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import * as actions from './../actions';
import { ListItem } from 'material-ui/List';
import { formatDate } from './../helpers/dateHelper'

class CommentItem extends Component {
    state = {
        editedComment: {
            body: ''
        },
        deleteDialogVisible: false,
        editMode: false,
        open: false
    }
    componentDidMount() {
        this.setState({ editedComment: { ...this.state.editedComment, body: this.props.comment.body } })
    }

    handleClick = (event) => {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };
    editCommentHandler = () => {
        this.setState({ editMode: true });
    }
    handleEditCancel = (e) => {
        this.setState({ editMode: false });
        this.setState({ open: false });
    }
    handleEditSave = () => {
        if (this.state.editedComment.body) {
            const comment = this.state.editedComment;
            comment.commentId = this.props.comment.id;
            this.props.updateComment(comment).then((x) => {
                this.setState({ open: false });
                this.setState({ editMode: false })
                this.props.onCommentEdited();
            })
        }
    }

    handleRequestClose = () => {
        this.setState({ open: false });
    }
    onChangeHandler = (event, value) => {
        this.setState({ editedComment: { ...this.state.editedComment, body: value } });
    }
    handleDeleteClose = () => {
        this.setState({ deleteDialogVisible: false });
    }
    handleDeletePostConfirm = () => {
        this.props.deleteComment(this.props.comment.id)
            .then(() => {
                this.setState({ deleteDialogVisible: false });
                this.props.onCommentEdited();
            })


    }
    deleteCommentHandler = () => {
        this.setState({ deleteDialogVisible: true });
        this.setState({ open: false });
    }
    render() {
        const style = { margin: 12 };
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
        const { comment } = this.props;
        const { editMode } = this.state;
        if (!editMode) {
            return (
                <div key={comment.id} >
                    <ListItem
                        onClick={this.handleClick}
                        leftAvatar={<Avatar src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" />}
                        primaryText={`${comment.body}`}
                        secondaryText={
                            <p className="author-date-container">
                                <span style={{ color: grey400 }}>{comment.author}</span>
                                <span className="comment-date">{formatDate(comment.timestamp)}</span>
                            </p>
                        }
                    />
                    <Dialog
                        actions={actions}
                        modal={true}
                        open={this.state.deleteDialogVisible}>
                        Are you sure to delete?
                </Dialog>
                    <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        onRequestClose={this.handleRequestClose}
                    >
                        <Menu>
                            <MenuItem primaryText="Edit" onClick={this.editCommentHandler} />
                            <MenuItem primaryText="Delete" onClick={this.deleteCommentHandler} />
                        </Menu>
                    </Popover>
                    <Divider inset={true} />
                </div >
            )
        } else {
            return (
                <div className="edit-comment-container">
                    <TextField
                        name='body'
                        value={this.state.editedComment.body}
                        onChange={this.onChangeHandler}
                        rows={2}
                        fullWidth={true}
                    />
                    <div className="save-cancel-actions">
                        <RaisedButton label="Save" primary={true} style={style} onClick={this.handleEditSave} />
                        <RaisedButton label="Cancel" primary={true} style={style} onClick={this.handleEditCancel} />
                    </div>
                </div>)
        }
    }
}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateComment: (comment) => dispatch(actions.updateComment(comment)),
        deleteComment: (commentId) => dispatch(actions.deleteComment(commentId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);