import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';


class PostCreateDialog extends Component {
    state = {
        open: false,
        newPost: {
            title: '',
            body: '',
            category: '',
        },
        errors: {
            title: '',
            body: '',
            category: ''
        },
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    clearFields = () => {
        this.setState({ newPost: { ...this.state.newPost, title: '', body: '', category: '' } })
    }
    isNewPostValid = () => {
        const { newPost, errors } = this.state;

        errors.title = !newPost.title ? 'title is required' : '';
        errors.body = !newPost.body ? 'body is required' : '';
        errors.category = !newPost.category ? 'category is required' : '';

        if (errors.body || errors.title || errors.category) {
            this.setState({ errors: errors })
            return false;
        }
        else {
            this.setState({ errors: errors });
            return true;
        }

    }

    handleNewPostInput = (event, index, value) => {
        this.setState({ newPost: { ...this.state.newPost, [event.target.name]: event.target.value } });
    }
    handleOnClose = () => {
        this.clearFields()
        this.setState({
            errors: {
                title: '',
                body: '',
                category: ''
            }
        })
        this.setState({ open: false })
    }
    handleNewPostCategory = (event, index, value) => {
        this.setState({ newPost: { ...this.state.newPost, category: value } });
    }
    handleClose = () => {
        if (this.isNewPostValid()) {
            this.setState({ open: false });
            this.props.saveNewPost(this.state.newPost)
                .then(() => {
                    this.clearFields();
                    this.props.onPostCreated()
                });
        }
    }

    render() {
        const { categories } = this.props;
        return (
            <div className="posts-actions">
                <RaisedButton label="New post" onClick={this.handleOpen} />
                <Dialog
                    title="Create new post"
                    actions={[
                        <FlatButton
                            label="Ok"
                            primary={true}
                            keyboardFocused={true}
                            onClick={this.handleClose}
                        />,
                    ]}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleOnClose}
                >
                    <TextField
                        name='title'
                        fullWidth={true}
                        floatingLabelText="Title"
                        value={this.state.newPost.title}
                        floatingLabelFixed={true}
                        errorText={this.state.errors.title}
                        onChange={this.handleNewPostInput}
                    />
                    <TextField
                        name='body'
                        floatingLabelText="Body"
                        fullWidth={true}
                        multiLine={true}
                        floatingLabelFixed={true}
                        value={this.state.newPost.body}
                        errorText={this.state.errors.body}
                        onChange={this.handleNewPostInput}
                        rows={2}
                    />
                    <SelectField
                        floatingLabelFixed={true}
                        floatingLabelText="Category"
                        value={this.state.newPost.category}
                        errorText={this.state.errors.category}
                        onChange={this.handleNewPostCategory}
                    >
                        {
                            categories.map((category) => (
                                <MenuItem key={category.name} value={category.name} primaryText={category.name} />))
                        }
                    </SelectField>
                </Dialog></div>)
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveNewPost: (post) => dispatch(actions.saveNewPost(post))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreateDialog);