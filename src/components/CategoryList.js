import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';
import * as actions from './../actions';

class CategoryList extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }
    render() {
        const { categories } = this.props;
        return (<div className="side-nav">
            <List>
                <Subheader>Categories</Subheader>
                <Link className="side-nav-item" to="/category/all">
                    <ListItem primaryText="all" leftIcon={<ContentInbox />} />
                </Link>
                {
                    categories.map((category) => (
                        <Link className="side-nav-item" key={category.name} to={`/category/${category.name}`}>
                            <ListItem primaryText={category.name} leftIcon={<ContentInbox />} />
                        </Link>
                    ))
                }
            </List>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCategories: () => dispatch(actions.fetchCategories())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);